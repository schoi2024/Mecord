// Script for website interaction! Yay!

let itemName = '';
let price = '';
let income = '';

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

// front.html: retrieve price value
const priceFormElement = document.getElementById("PriceForm");
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

const weekFormElement = document.getElementById("weekForm");
if (weekFormElement) {
    weekFormElement.addEventListener("submit", function(event) {
        event.preventDefault();
        
        week = document.getElementById("inputWeek").value;
    
        window.location.href = "askIncome.html?";
    });
}

// askIncome.html: retrieve income value
document.getElementById("incomeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    income = document.getElementById("inputNumber").value;

    window.location.href = "";
});
