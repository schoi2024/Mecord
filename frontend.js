// Script for website interaction! Yay!

let itemName = '';
let price = '';
let week = '';
let income = '';

let groceries = '';
let eating_out = '';
let shopping = '';
let necessities = '';
let transportation = '';

// typing in price
const inputNumberElement = document.getElementById("inputNumber");
if (inputNumberElement) {
    inputNumberElement.addEventListener("input", function(event) {
        event.preventDefault();
        let value = this.value.replace(/\D/g, ""); 
        this.value = (value !== "") ? "$ " + value : "";
    });
}

// front.html: retrieve item name
const inputNameElement = document.getElementById("inputName");
if (inputNameElement) {
    inputNameElement.addEventListener("input", function(event) {
        event.preventDefault();
        itemName = inputNameElement.value;
    });
}

// front.html: retrieve price value and redirect to askDuration.html
const priceFormElement = document.getElementById("priceForm");
if (priceFormElement) {
    priceFormElement.addEventListener("submit", function(event) {
        event.preventDefault();
        price = document.getElementById("inputNumber").value;
        window.location.href = "askDuration.html?item=" + encodeURIComponent(itemName);
        // window.location.href = "askincome.html?item=" + encodeURIComponent(itemName) + "&price=" + encodeURIComponent(price);
    });
}

// askDuration.html: retrieve itemName from front
const displayNameElement = document.getElementById("displayName");
if (displayNameElement) {
    const urlParams = new URLSearchParams(window.location.search);
    const loadedItemName = urlParams.get("item");

    if (loadedItemName) {
    document.getElementById("displayName").textContent = "For how many weeks are you willing to save up for " + loadedItemName + "?";
    }
}

// askDuration.html: typing in week
const inputWeekElement = document.getElementById("inputWeek");
if (inputWeekElement) {
    inputWeekElement.addEventListener("input", function(event) {
        event.preventDefault();
        let value = this.value.replace(/\D/g, ""); 
        this.value = (value !== "") ? value + " Weeks" : "";
    });
}

// askDuration.html: retrieve week value and redirect to askIncome.html
const weekFormElement = document.getElementById("weekForm");
if (weekFormElement) {
    weekFormElement.addEventListener("submit", function(event) {
        event.preventDefault();
        week = document.getElementById("inputWeek").value.replace(/[^\d.-]/g, '');;
        window.location.href = "askIncome.html";
    });
}

// askIncome.html: retrieve income value and redirect to askBudget.html
const incomeFormElement = document.getElementById("incomeForm");
if (incomeFormElement) {
    incomeFormElement.addEventListener("submit", function(event) {
        event.preventDefault();
        income = document.getElementById("inputNumber").value;
        window.location.href = "askBudget.html";
    });
}


// askBudget.html: set up table with budget values
const inputBudgetElement = document.getElementsByClassName("amount");
if (inputBudgetElement) {
    for (let i = 0; i < inputBudgetElement.length; i++) {
        inputBudgetElement[i].addEventListener("input", function(event) {
            event.preventDefault();
            let value = this.value.replace(/\D/g, ""); 
            this.value = (value !== "") ? "$ " + value : "";
        });
    }
}

// askBudget.html: retrieve budget values and redirect to _________
const budgetSubmitButton = document.getElementById("budgetSubmit");
if (budgetSubmitButton) {
    budgetSubmitButton.addEventListener("click", function(event) {
        event.preventDefault();
        groceries = document.getElementById("groceries").value.replace(/[^\d.-]/g, '');
        eating_out = document.getElementById("eating-out").value.replace(/[^\d.-]/g, '');
        shopping = document.getElementById("shopping").value.replace(/[^\d.-]/g, '');
        necessities = document.getElementById("necessities").value.replace(/[^\d.-]/g, '');
        transportation = document.getElementById("transportation").value.replace(/[^\d.-]/g, '');

        sendDataToKotlin();

        window.location.href = "finalBudget.html?groceries=" + encodeURIComponent(groceries) + "&eating_out=" + encodeURIComponent(eating_out) + "&shopping=" + encodeURIComponent(shopping) + "&necessities=" + encodeURIComponent(necessities) + "&transportation=" + encodeURIComponent(transportation);
    });
}

function sendDataToKotlin() {

    var data = {
        itemName: itemName,
        price: price,
        week: week,
        income: income,
        groceries: groceries,
        eatingOut: eating_out,
        shopping: shopping,
        necessities: necessities,
        transportation: transportation
    };

    // Send data to Kotlin backend using fetch API
    fetch("http://localhost:8080/submitBudget", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}