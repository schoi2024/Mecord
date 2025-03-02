package com.example.budgetapp.controller  // ✅ Ensure correct package

import org.springframework.web.bind.annotation.*
import com.example.budgetapp.model.BudgetRequest

@RestController
@RequestMapping("/api")
class BudgetController {

    @PostMapping("/submitBudget")
    fun receiveBudget(@RequestBody budgetRequest: BudgetRequest): Map<String, Any> {
        println("Received Budget Data: $budgetRequest")

        val totalExpenses = budgetRequest.groceries + budgetRequest.eatingOut +
                            budgetRequest.shopping + budgetRequest.necessities +
                            budgetRequest.transportation
        
        val remainingIncome = budgetRequest.income - totalExpenses

        return mapOf(
            "message" to "Budget received successfully!",
            "totalExpenses" to totalExpenses,
            "remainingIncome" to remainingIncome
        )
    }
}
