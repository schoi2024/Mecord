package mecord.service

import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.gson.*
import io.ktor.http.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

import mecord.model.BudgetRequest
import mecord.utils.DetermineDistribution
import mecord.utils.CalculateHeaviness
import mecord.utils.HowMuchSavingForEach
import mecord.utils.HowMuchSavingForWeek
import mecord.utils.HowMuchUsingForWeek
import mecord.utils.processData
import mu.KotlinLogging

private val logger = KotlinLogging.logger("BudgetService")

class BudgetService {
    fun processBudget(budgetRequest: BudgetRequest): Map<Int, DoubleArray> {
        val price: Int = budgetRequest.price
        val week: Int = budgetRequest.week
        val expensesArray: DoubleArray = budgetRequest.toExpenseArray()

        val distribution = DetermineDistribution(expensesArray)
        val heaviness = CalculateHeaviness(week, distribution, price)
        val savingsPerCategory = HowMuchSavingForEach(week, expensesArray, price)
        val weeklySavingsArray = HowMuchSavingForWeek(heaviness, savingsPerCategory)
        val weeklySpendingAdjustments = HowMuchUsingForWeek(weeklySavingsArray, expensesArray)
        val result = processData(weeklySavingsArray, weeklySpendingAdjustments)

        logger.info { "Final Processed Budget Data:\n" + result.entries.joinToString("\n") { (key, value) -> "Week $key -> ${value.joinToString(", ", "[", "]")}" } }

        return result
    }
}

fun main() {
    embeddedServer(Netty, port = 8080) {
        install(ContentNegotiation) {
            gson() // Configure Gson for JSON serialization
        }
        routing {
            post("/process-budget") {
                val request = call.receive<BudgetRequest>() // Receive the request body
                val service = BudgetService()
                val result = service.processBudget(request) // Process the budget
                call.respond(HttpStatusCode.OK, result) // Respond with JSON result
            }
        }
    }.start(wait = true)
}
