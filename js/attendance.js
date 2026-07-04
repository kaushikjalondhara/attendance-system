// ======================================
// ATTENDANCE MANAGEMENT SYSTEM
// ======================================

// Selected Standard
const selectedStandard = localStorage.getItem("selectedStandard");

if (!selectedStandard) {
    window.location.href = "select-standard.html";
}

// Show Current Standard
document.getElementById("currentStandard").textContent =
    "Standard " + selectedStandard;

document.getElementById("currentClassText").textContent =
    "Standard " + selectedStandard;

// Date Picker
const attendanceDate = document.getElementById("attendanceDate");
attendanceDate.value = new Date().toISOString().split("T")[0];

// Load Students
const allStudents =
    JSON.parse(localStorage.getItem("students")) || [];

const classStudents = allStudents.filter(student =>
    student.standard == selectedStandard
);

// Attendance Data
let attendance =
    JSON.parse(localStorage.getItem("attendance")) || {};

// Table
const table =
    document.getElementById("attendanceTable");

// ======================================
// LOAD STUDENTS
// ======================================

function loadStudents() {

    const selectedDate = attendanceDate.value;

    table.innerHTML = "";

    if (!attendance[selectedDate]) {
        attendance[selectedDate] = {};
    }

    if (!attendance[selectedDate][selectedStandard]) {
        attendance[selectedDate][selectedStandard] = {};
    }

    if (classStudents.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6" class="no-data">
                No Students Found
            </td>
        </tr>
        `;

        return;
    }

    classStudents.forEach(student => {

        const savedStatus =
            attendance[selectedDate][selectedStandard][student.id] || "Present";

        table.innerHTML += `

        <tr>

            <td>
                <img src="${student.photo || 'images/default-avatar.png'}"
                     class="student-photo">
            </td>

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td>Standard ${student.standard}</td>

            <td>
                <input
                    type="radio"
                    name="attendance_${student.id}"
                    value="Present"
                    ${savedStatus === "Present" ? "checked" : ""}
                >
            </td>

            <td>
                <input
                    type="radio"
                    name="attendance_${student.id}"
                    value="Absent"
                    ${savedStatus === "Absent" ? "checked" : ""}
                >
            </td>

        </tr>

        `;

    });

}

// ======================================
// DATE CHANGE
// ======================================

attendanceDate.addEventListener("change", function () {

    attendance =
        JSON.parse(localStorage.getItem("attendance")) || {};

    loadStudents();

});

// First Load
loadStudents();

// ======================================
// SAVE ATTENDANCE
// ======================================

document
    .getElementById("saveAttendance")
    .addEventListener("click", saveAttendance);

function saveAttendance() {

    const selectedDate = attendanceDate.value;

    attendance =
        JSON.parse(localStorage.getItem("attendance")) || {};

    if (!attendance[selectedDate]) {
        attendance[selectedDate] = {};
    }

    if (!attendance[selectedDate][selectedStandard]) {
        attendance[selectedDate][selectedStandard] = {};
    }

    classStudents.forEach(student => {

        const selectedRadio = document.querySelector(
            `input[name="attendance_${student.id}"]:checked`
        );

        attendance[selectedDate][selectedStandard][student.id] =
            selectedRadio ? selectedRadio.value : "Absent";

    });

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    alert("Attendance Saved Successfully");

}

// ======================================
// TODAY BUTTON
// ======================================

function goToToday() {

    attendanceDate.value =
        new Date().toISOString().split("T")[0];

    loadStudents();

}