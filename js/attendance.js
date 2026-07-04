// ======================================
// ATTENDANCE MANAGEMENT SYSTEM
// attendance.js - Part 1
// ======================================

// ----------------------------
// Selected Standard
// ----------------------------

const selectedStandard =
    localStorage.getItem("selectedStandard");

if (!selectedStandard) {

    window.location.href = "select-standard.html";

}

// ----------------------------
// Show Current Standard
// ----------------------------

document.getElementById("currentStandard").textContent =
    "Standard " + selectedStandard;

document.getElementById("currentClassText").textContent =
    "Standard " + selectedStandard;

// ----------------------------
// Date Picker
// ----------------------------

const attendanceDate =
    document.getElementById("attendanceDate");

// Default Today Date

attendanceDate.value =
    new Date().toISOString().split("T")[0];

// ----------------------------
// Load Students
// ----------------------------

const allStudents =
    JSON.parse(localStorage.getItem("students")) || [];

// Selected Standard Students

const classStudents = allStudents.filter(student =>
    student.standard == selectedStandard
);

// ----------------------------
// Attendance Data
// ----------------------------

let attendance =
    JSON.parse(localStorage.getItem("attendance")) || {};

// ----------------------------
// Table
// ----------------------------

const table =
    document.getElementById("attendanceTable");

// ======================================
// LOAD STUDENTS
// ======================================

function loadStudents() {

    const selectedDate =
        attendanceDate.value;

    table.innerHTML = "";

    // Create Date Object

    if (!attendance[selectedDate]) {

        attendance[selectedDate] = {};

    }

    if (!attendance[selectedDate][selectedStandard]) {

        attendance[selectedDate][selectedStandard] = {};

    }

    // No Students

    if (classStudents.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="5" class="no-data">

                No Students Found

            </td>

        </tr>

        `;

        return;

    }



    classStudents.forEach(student => {

        // Saved Attendance

        const savedStatus =
            attendance[selectedDate][selectedStandard][student.id] || "Present";

        table.innerHTML += `

        <tr>

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
// AUTO LOAD WHEN DATE CHANGES
// ======================================

attendanceDate.addEventListener("change", function () {

    attendance =
        JSON.parse(localStorage.getItem("attendance")) || {};

    loadStudents();

});

// ======================================
// FIRST LOAD
// ======================================

loadStudents();

// ======================================
// SAVE ATTENDANCE
// ======================================

// આગળ Part 3 માં...
// ======================================
// SAVE / UPDATE ATTENDANCE
// ======================================

document
    .getElementById("saveAttendance")
    .addEventListener("click", saveAttendance);

function saveAttendance() {

    const selectedDate = attendanceDate.value;

    // Reload Latest Data

    attendance =
        JSON.parse(localStorage.getItem("attendance")) || {};

    // Create Date

    if (!attendance[selectedDate]) {

        attendance[selectedDate] = {};

    }

    // Create Standard

    if (!attendance[selectedDate][selectedStandard]) {

        attendance[selectedDate][selectedStandard] = {};

    }

    // Save Every Student

    classStudents.forEach(student => {

        const selectedRadio = document.querySelector(

            `input[name="attendance_${student.id}"]:checked`

        );

        attendance[selectedDate][selectedStandard][student.id] =

            selectedRadio
                ? selectedRadio.value
                : "Absent";

    });

    // Save LocalStorage

    localStorage.setItem(

        "attendance",

        JSON.stringify(attendance)

    );

    alert(

        "Attendance Saved Successfully for " +

        selectedDate

    );

}

// ======================================
// REFRESH DATA AFTER SAVE
// ======================================

attendanceDate.addEventListener("change", () => {

    attendance =
        JSON.parse(localStorage.getItem("attendance")) || {};

    loadStudents();

});

// ======================================
// OPTIONAL : TODAY BUTTON
// ======================================

function goToToday() {

    attendanceDate.value =
        new Date().toISOString().split("T")[0];

    loadStudents();

}

// ======================================
// END OF FILE
// ======================================