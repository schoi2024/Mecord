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
import mecord.utils.DetermineDistribution   // ✅ Update import path
import mecord.utils.CalculateHeaviness      // ✅ Update import path
import mecord.utils.HowMuchSavingForEach    // ✅ Update import path
import mecord.utils.HowMuchSavingForWeek    // ✅ Update import path
import mecord.utils.HowMuchUsingForWeek     // ✅ Update import path
import mecord.utils.processData             // ✅ Update import path

class BudgetService {
    fun processBudget(budgetRequest: BudgetRequest): Map<Int, DoubleArray> {
        val price: Int = budgetRequest.price
        val week: Int = budgetRequest.week
        val expensesArray: DoubleArray = budgetRequest.toExpenseArray()

        println("Processing Budget - Price: $price, Week: $week, Expenses: ${expensesArray.joinToString()}")

        val distribution = DetermineDistribution(expensesArray)
        val heaviness = CalculateHeaviness(week, distribution, price)
        val savingsPerCategory = HowMuchSavingForEach(week, expensesArray, price)
        val weeklySavingsArray = HowMuchSavingForWeek(heaviness, savingsPerCategory)
        val weeklySpendingAdjustments = HowMuchUsingForWeek(weeklySavingsArray, expensesArray)
        val result = processData(weeklySavingsArray, weeklySpendingAdjustments)

        println("Final Processed Budget Data: $result")
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
