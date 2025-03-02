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
        localStorage.setItem("itemName", itemName);
    });
}

// front.html: retrieve price value and redirect to askDuration.html
const priceFormElement = document.getElementById("priceForm");
if (priceFormElement) {
    priceFormElement.addEventListener("submit", function(event) {
        event.preventDefault();
        price = document.getElementById("inputNumber").value.replace(/[^\d.-]/g, '');;
        localStorage.setItem("price", price);
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
        week = document.getElementById("inputWeek").value.replace(/[^\d.-]/g, '');
        localStorage.setItem("week", week);
        window.location.href = "askIncome.html";
    });
}

// askIncome.html: retrieve income value and redirect to askBudget.html
const incomeFormElement = document.getElementById("incomeForm");
if (incomeFormElement) {
    incomeFormElement.addEventListener("submit", function(event) {
        event.preventDefault();
        income = document.getElementById("inputNumber").value.replace(/[^\d.-]/g, '');;
        localStorage.setItem("income", income);
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

        window.location.href = "finalBudget.html?groceries=" + encodeURIComponent(groceries) + "&eating_out=" + encodeURIComponent(eating_out) + "&shopping=" + encodeURIComponent(shopping) + "&necessities=" + encodeURIComponent(necessities) + "&transportation=" + encodeURIComponent(transportation) + "&itemName=" + encodeURIComponent(itemName) + "&price=" + encodeURIComponent(price) + "&week=" + encodeURIComponent(week) + "&income=" + encodeURIComponent(income);
    });
}

const displayInputElement = document.getElementById("displayInput");
if (displayInputElement) {
    const urlParams = new URLSearchParams(window.location.search);
    const l_item = localStorage.getItem("itemName");
    const l_price = localStorage.getItem("price");
    const l_week = localStorage.getItem("week");
    const l_income = localStorage.getItem("income");
    const l_groceries = urlParams.get("groceries");
    const l_eating_out = urlParams.get("eating_out");
    const l_shopping = urlParams.get("shopping");
    const l_necessities = urlParams.get("necessities");
    const l_transportation = urlParams.get("transportation");

    document.getElementById("displayInput").innerHTML = l_item + "<br>" + l_price + "<br>" + l_week + "<br>" + l_income + "<br>" + l_groceries + "<br>" + l_eating_out + "<br>" + l_shopping + "<br>" + l_necessities + "<br>" + l_transportation;
    
}

// function to send data to Kotlin backend
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