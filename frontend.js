// Script for website interaction

document.getElementById("priceForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from submitting and reloading the page
    
    // Get the number entered by the user
    const number = document.getElementById("inputPrice").value;
    
    // You can process the number here (e.g., save it, log it, etc.)
    console.log("Submitted number:", number);
    
    window.location.href = "askincome.html?number=" + encodeURIComponent(number);
});