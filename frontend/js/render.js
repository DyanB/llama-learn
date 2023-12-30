// render.js

document.addEventListener("DOMContentLoaded", function () {
    var loginButton = document.querySelector(".login-button");
    var emailInput = document.getElementById("email");

    loginButton.addEventListener("click", function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the value from the email input
        var emailValue = emailInput.value.trim();

        // Check if the email is valid using a simple regular expression
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            alert("Please enter a valid email address");
            return;
        }

        // If the email is valid, you can proceed with your login logic here
        alert("Login button clicked! Email is valid: " + emailValue);
    });
});
