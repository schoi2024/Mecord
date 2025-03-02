// Function to retrieve the input and determine the distribution
function determineDistribution(spends) {
    const sum = spends.reduce((a, b) => a + b, 0);
    const pureWants = (spends[0] + spends[1]) / sum;
    const necessities = (spends[3] + spends[4]) / sum;
    const groceryRatio = spends[2] / (spends[0] + spends[2]);
    const eatingOutRatio = spends[0] / (spends[0] + spends[2]);

    if (groceryRatio > (eatingOutRatio * 2)) {
        return 2;
    } else if ((necessities / 3) < pureWants) {
        return 1;
    }
    return 0;
}

// Function to calculate the heaviness (weekly savings)
function calculateHeaviness(time, distribution, cost) {
    const percentage = 100.0 / (time * 2);
    const weeklySaving = cost / time;
    let heaviness = new Array(time).fill(0);
    let instinct = Math.floor(time / 2);

    if (distribution === 0) {
        heaviness.fill(100.0);
    } else if (distribution === 1) {
        if (time % 2 === 0) {
            for (let i = 0; i < time + 1; i++) {
                if (i < time / 2) {
                    heaviness[i] = ((time / 2 - i) * percentage + 100.0);
                } else if (i === time / 2) {
                    continue;
                } else {
                    heaviness[i - 1] = ((time / 2 - i) * percentage + 100.0);
                }
            }
        } else {
            for (let i = 0; i < time; i++) {
                heaviness[i] = ((time / 2 - i) * percentage + 100.0);
            }
        }
    } else {
        if (time % 2 === 0) {
            for (let i = 0; i < time + 1; i++) {
                if (i < time / 2) {
                    heaviness[i] = ((-time / 2 + i) * percentage + 100.0);
                } else if (i === time / 2) {
                    continue;
                } else {
                    heaviness[i - 1] = ((-time / 2 + i) * percentage + 100.0);
                }
            }
        } else {
            for (let i = 0; i < time; i++) {
                heaviness[i] = ((-time / 2 + i) * percentage + 100.0);
            }
        }
    }
    return heaviness;
}

// Function to determine how much to save for each category
function howMuchSavingForEach(time, spends, cost) {
    const savingMap = {};
    const weeklySaving = cost / time;
    const pureWants = spends[0] + spends[1];

    if (pureWants * 0.7 > weeklySaving) {
        const eatingOutRatio = spends[0] / pureWants;
        const shoppingRatio = spends[1] / pureWants;
        savingMap[0] = eatingOutRatio * weeklySaving;
        savingMap[1] = shoppingRatio * weeklySaving;
        for (let i = 2; i < 5; i++) {
            savingMap[i] = 0.0;
        }
    } else {
        savingMap[0] = spends[0] * 0.7;
        savingMap[1] = spends[1] * 0.7;
        const remainder = weeklySaving - (spends[0] + spends[1]) * 0.7;
        savingMap[2] = remainder;
        savingMap[3] = 0.0;
        savingMap[4] = 0.0;
    }
    return savingMap;
}

// Function to calculate how much to save per week
function howMuchSavingForWeek(arr, map) {
    return arr.map(factor => {
        return Object.fromEntries(Object.entries(map).map(([key, value]) => [key, value * (factor / 100.0)]));
    });
}

// Function to calculate how much to use per week
function howMuchUsingForWeek(arrayOfMaps, doubleArray) {
    return arrayOfMaps.map(map => {
        return Object.fromEntries(Object.entries(map).map(([key, value]) => [key, (doubleArray[key] || 0) - value]));
    });
}

// Function to process the savings and spending data
function processData(array1, array2) {
    const result = {};

    for (let i = 0; i < array2.length; i++) {
        const key = i + 1;
        const sortedValues = Object.values(array2[i]).sort((a, b) => a - b);
        const sumOfArray1 = Object.values(array1[i] || {}).reduce((a, b) => a + b, 0);
        result[key] = [...sortedValues, sumOfArray1];
    }

    return result;
}

const result = '';

function processBudget() {
    const price = localStorage.getItem("price");
    const week = localStorage.getItem("week");
    const expensesArray = budgetRequest.toExpenseArray();

    const distribution = determineDistribution(expensesArray);
    const heaviness = calculateHeaviness(week, distribution, price);
    const savingsPerCategory = howMuchSavingForEach(week, expensesArray, price);
    const weeklySavingsArray = howMuchSavingForWeek(heaviness, savingsPerCategory);
    const weeklySpendingAdjustments = howMuchUsingForWeek(weeklySavingsArray, expensesArray);
    const result = processData(weeklySavingsArray, weeklySpendingAdjustments);
    localStorage.setItem("result", result);
}



function updateTable(result) {
    const tbody = document.querySelector('#finalBudget tbody');
    tbody.innerHTML = ''; // Clear any existing rows

    // Iterate through the result and create rows
    Object.keys(result).forEach((weekNumber) => {
        const row = document.createElement('tr');
        const weekData = result[weekNumber];
        
        // Create the first cell with the week number
        const weekCell = document.createElement('td');
        weekCell.textContent = `Week ${weekNumber}`;
        row.appendChild(weekCell);
        
        // Create cells for each category (eating out, shopping, groceries, etc.)
        weekData.forEach((data) => {
            const cell = document.createElement('td');
            cell.textContent = `$${data.toFixed(2)}`; // Format to 2 decimal places
            row.appendChild(cell);
        });

        // Add the row to the table body
        tbody.appendChild(row);
    });
}
