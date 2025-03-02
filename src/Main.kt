package mypackage
import mypackage.*
fun main() {
    val weekly_spends = doubleArrayOf(100.0, 50.0, 300.0, 525.0, 300.0)
    val time = 5
    val price = 500
    val distribution = DetermineDistribution(weekly_spends)
    println("🔹 Distribution: $distribution") // Print distribution result

    val heaviness: DoubleArray = CalculateHeaviness(time, distribution, price)
    println("🔹 Heaviness: ${heaviness.joinToString(", ")}") // Print heaviness array

    val each_category: Map<Int, Double> = HowMuchSavingForEach(time, weekly_spends, price)
    println("🔹 Each Category Saving: $each_category") // Print savings per category

    val array1: Array<Map<Int, Double>> = HowMuchSavingForWeek(heaviness, each_category)
    println("🔹 Weekly Savings Per Category:")
    array1.forEachIndexed { index, map -> println("  Week ${index + 1}: $map") }

    val array2: Array<Map<Int, Double>> = HowMuchUsingForWeek(array1, weekly_spends)
    println("🔹 Weekly Usage Per Category:")
    array2.forEachIndexed { index, map -> println("  Week ${index + 1}: $map") }

    val result: Map<Int, DoubleArray> = processData(array1, array2)
    println("🔹 Final Processed Data:")
    result.forEach { (key, value) ->
        println("  Week $key -> ${value.joinToString(", ")}")
    }

}

fun running (weekly_spends : DoubleArray, time : Int, price : Int): Map<Int, DoubleArray> {
    val distribution = DetermineDistribution(weekly_spends)
    val heaviness :DoubleArray =  CalculateHeaviness(time, distribution, price)
    val each_category : Map<Int, Double> = HowMuchSavingForEach(time, weekly_spends, price)
    val array1 : Array<Map<Int, Double>> = HowMuchSavingForWeek(heaviness, each_category)
    val array2 : Array<Map<Int, Double>> = HowMuchUsingForWeek(array1, weekly_spends)
    val result : Map<Int, DoubleArray> = processData(array1, array2)
    return result
}