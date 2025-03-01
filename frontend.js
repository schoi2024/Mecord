// Script for website interaction

document.getElementById("inputField").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission (if inside a form)
        window.location.href = "askincome.html"; // Change to your desired page
    }
});