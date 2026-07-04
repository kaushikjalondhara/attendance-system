// ===============================
// Select Standard
// ===============================

const form = document.getElementById("classForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const standard = document.getElementById("standard").value;

    if (standard === "") {

        alert("Please Select Standard");

        return;

    }

    // Save Selected Standard
    localStorage.setItem("selectedStandard", standard);

    // Go Dashboard
    window.location.href = "dashboard.html";

});