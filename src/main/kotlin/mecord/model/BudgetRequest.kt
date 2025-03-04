package mecord.model

import kotlinx.serialization.Serializable

@Serializable
data class BudgetRequest(
    val itemName: String,
    val price: Int,  // ✅ Ensure `price` is Int
    val week: Int,   // ✅ Ensure `week` is Int
    val income: Double,
    val groceries: Int,
    val eatingOut: Int,
    val shopping: Int,
    val necessities: Int,
    val transportation: Int
) {
    // ✅ Function to return expenses as IntArray
    fun toExpenseArray(): DoubleArray {
        return doubleArrayOf(eatingOut.toDouble().toDouble(), groceries.toDouble(), necessities.toDouble(), transportation.toDouble())
    }
}

