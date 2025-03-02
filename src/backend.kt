package mypackage

// function to retrieve the input
// will return a double array
// divide it by 4 to be weekly

// determining the distribution
// input is the map of weekly spend for each category
// will return 0 or 1 or 2
fun DetermineDistribution(spends: DoubleArray): Int {
    val sum = spends.sum()
    val pure_wants = (spends[0] + spends[1]) / sum
    val necessities = (spends[3] + spends[4]) / sum
    val grocery_ratio = (spends[2]) / (spends[0] + spends[2])
    val eating_out_ratio = spends[0] / (spends[0] + spends[2])
    if (grocery_ratio > (eating_out_ratio * 2)) {
        return 2
    } else if ((necessities / 3) < pure_wants) {
        return 1
    }
    return 0
}

// function calculatung the heaviness
// calculate the weekly savings
// input : time as int (week), and the distribution from DetermineDistribution, cost of the product in int (rounded while reading input)
// return double array
fun CalculateHeaviness(time : Int, distribution: Int, cost: Int): DoubleArray {
    val percentage = 100.0 / (time * 2)
    val weekly_saving = cost.toDouble() / time.toDouble()
    var heaviness  = DoubleArray(time)
    var instint = time / 2
    if (distribution == 0) {
        for (i in 0 until time - 1) {
            heaviness[i] = 100.0
        }
    } else if (distribution == 1) {
        if (time % 2 == 0) {
            for (i in 0 until time + 1) {
                if (i < time / 2) {
                    heaviness[i] = ((time / 2 - i).toDouble() * percentage + 100.0)
                } else if (i == time / 2) {
                    continue
                } else {
                    heaviness[i - 1] = ((time / 2 - i).toDouble() * percentage + 100.0)
                }
            }
        } else {
            for (i in 0 until time) {
                heaviness[i] = ((time / 2 - i).toDouble() * percentage + 100.0)
            }
        }
    } else {
        if (time % 2 == 0) {
            for (i in 0 until time + 1) {
                if (i < time / 2) {
                    heaviness[i] = ((- time / 2 + i).toDouble() * percentage + 100.0)
                } else if (i == time / 2) {
                    continue
                } else {
                    heaviness[i - 1] = ((- time / 2 + i).toDouble() * percentage + 100.0)
                }
            }
        } else {
            for (i in 0 until time) {
                heaviness[i] = ((- time / 2 + i).toDouble() * percentage + 100.0)
            }
        }
    }
    return heaviness
}

// function to determine how much to save in each category
fun HowMuchSavingForEach(time : Int, spends : DoubleArray, cost : Int): Map<Int, Double> {
    val saving_map = mutableMapOf<Int, Double>()
    val weekly_saving = cost.toDouble() / time
    val pure_wants = spends[0] + spends[1]
    if (pure_wants * 0.7 > weekly_saving) {
        val eating_out_ratio = spends[0] / pure_wants
        val shopping_ratio = spends[1] / pure_wants
        saving_map.put(0, eating_out_ratio * weekly_saving)
        saving_map.put(1, shopping_ratio * weekly_saving)
        for (i in 2 until 5) {
            saving_map.put(i, 0.0)
        }
    } else {
        saving_map.put(0, spends[0] * 0.7)
        saving_map.put(1, spends[1] * 0.7)
        val remainder = weekly_saving - (spends[0] + spends[1]) * 0.7
        saving_map.put(2, remainder)
        saving_map.put(3, 0.0)
        saving_map.put(4, 0.0)
    }
    return saving_map
}

// arr is weight distribution
// Map is from HowMuchSavingForEach
fun HowMuchSavingForWeek(arr: DoubleArray, map: Map<Int, Double>): Array<Map<Int, Double>> {
    return arr.map { factor ->
        map.mapValues { (_, value) -> value * (factor / 100.0) } // Floating-point division
    }.toTypedArray()
}

// DoubleArray is weekly spendings
// array of Maps is from HowMuchSavingForWweek
fun HowMuchUsingForWeek(arrayOfMaps: Array<Map<Int, Double>>, doubleArray: DoubleArray): Array<Map<Int, Double>> {
    return arrayOfMaps.map { map ->
        map.mapValues { (key, value) ->
            (doubleArray.getOrNull(key) ?: 0.0) - value  // Reversed subtraction
        }
    }.toTypedArray()
}

// array1 is saving amount array
// array2 is using amount array
fun processData(array1: Array<Map<Int, Double>>, array2: Array<Map<Int, Double>>): Map<Int, DoubleArray> {
    val result = mutableMapOf<Int, DoubleArray>()

    for (i in array2.indices) {
        val key = i + 1

        // Get sorted values from array2[i] based on keys
        val sortedValues = array2[i].toSortedMap().values.toList()

        // Sum of values from array1[i]
        val sumOfArray1 = array1.getOrNull(i)?.values?.sum() ?: 0.0

        // Combine sorted values and sumOfArray1 into a DoubleArray
        result[key] = (sortedValues + sumOfArray1).toDoubleArray()
    }

    return result
}


