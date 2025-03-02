package mecord.service

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
