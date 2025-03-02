package com.example.budgetapp.service

import com.example.budgetapp.model.BudgetRequest

class BudgetService {
    fun processBudget(budgetRequest: BudgetRequest): Map<String, Any> {
        val expensesArray = budgetRequest.toExpenseArray()  // ✅ Convert to IntArray
        val totalExpenses = expensesArray.sum()  // ✅ Sum of all expenses
        val remainingIncome = budgetRequest.income - totalExpenses

        println("Processing budget for ${budgetRequest.itemName}")
        println("Week: ${budgetRequest.week}, Price: ${budgetRequest.price}")
        println("Expenses: ${expensesArray.joinToString()}")

        return mapOf(
            "message" to "Budget processed successfully!",
            "price" to budgetRequest.price,
            "week" to budgetRequest.week,
            "totalExpenses" to totalExpenses,
            "remainingIncome" to remainingIncome,
            "expensesArray" to expensesArray.toList()  // ✅ Convert IntArray to List for JSON response
        )
    }
}
