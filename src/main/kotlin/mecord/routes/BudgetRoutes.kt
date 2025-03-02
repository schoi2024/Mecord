package mecord.routes

import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import mecord.model.BudgetRequest
import mecord.service.BudgetService

fun Route.budgetRoutes() {
    val budgetService = BudgetService()

    post("/submitBudget") {
        val budgetRequest = call.receive<BudgetRequest>() // ✅ Read JSON from frontend
        println("Received Data: $budgetRequest") // ✅ Debugging
        val response = budgetService.processBudget(budgetRequest) // ✅ Process data
        call.respond(response) // ✅ Send response back to frontend
    }
}
