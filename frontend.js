// Script for website interaction! Yay!

let itemName = '';
let price = '';
let income = '';

// front.html: retrieve item name
document.getElementById("inputName").addEventListener("input", function(event) {
    event.preventDefault();
    itemName = document.getElementById("inputName").value;

});

// typing in price
document.getElementById("inputNumber").addEventListener("input", function() {
    let value = this.value.replace(/\D/g, ""); 
    this.value = (value !== "") ? "$ " + value : "";
});

// front.html: retrieve price value
document.getElementById("priceForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    price = document.getElementById("inputNumber").value;

    window.location.href = "askDuration.html?item=" + encodeURIComponent(itemName);
    // window.location.href = "askincome.html?item=" + encodeURIComponent(itemName) + "&price=" + encodeURIComponent(price);

});


const urlParams = new URLSearchParams(window.location.search);
const loadedItemName = urlParams.get("item");

if (loadedItemName) {
    document.getElementById("displayName").textContent = "For how many weeks are you willing to save up for " + loadedItemName + "?";
}

// askIncome.html: retrieve income value
document.getElementById("incomeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    income = document.getElementById("inputNumber").value;

    window.location.href = "";
});
