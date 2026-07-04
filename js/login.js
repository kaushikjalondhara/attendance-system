alert("Correct login.js loaded");
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    if (email === "teacher@gmail.com" && password === "12345") {

        alert("Login Successfully");

        // Login પછી પહેલા Standard Select Page ખુલશે
        window.location.href = "select-standard.html";

    } else {

        alert("Invalid Email or Password");

    }

});