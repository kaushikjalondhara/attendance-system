// ======================================
// REPORTS.JS - PART 1
// ======================================

// ----------------------------
// Selected Standard
// ----------------------------

const selectedStandard = localStorage.getItem("selectedStandard");

if (!selectedStandard) {

    window.location.href = "select-standard.html";

}

// ----------------------------
// Show Current Standard
// ----------------------------

document.getElementById("currentStandard").textContent =
    "Standard " + selectedStandard;

// ----------------------------
// Load Students
// ----------------------------

const allStudents =
    JSON.parse(localStorage.getItem("students")) || [];

// Filter Current Standard Students

const students = allStudents.filter(student =>
    student.standard == selectedStandard
);

// ----------------------------
// Attendance Data
// ----------------------------

const attendance =
    JSON.parse(localStorage.getItem("attendance")) || {};

// ----------------------------
// Current Month
// ----------------------------

const monthInput =
    document.getElementById("reportMonth");

const today = new Date();

monthInput.value =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0");

// ----------------------------
// Load Button
// ----------------------------

document
    .getElementById("loadReport")
    .addEventListener("click", loadReport);

// First Load

loadReport();

// ======================================
// LOAD REPORT
// ======================================

function loadReport() {

    const month = monthInput.value;

    const tbody =
        document.getElementById("reportTable");

    tbody.innerHTML = "";

    // Dashboard Cards

    let totalPresent = 0;
    let totalAbsent = 0;

    // Highest / Lowest

    let highestAttendance = -1;
    let lowestAttendance = 101;

    let highestStudent = "-";
    let lowestStudent = "-";

    // Selected Month

    document.getElementById("selectedMonth").textContent =
        new Date(month + "-01").toLocaleString("default", {

            month: "long",
            year: "numeric"

        });

    // Student Loop Starts

    students.forEach(student => {

        let present = 0;
        let absent = 0;

        // Date Loop

        for (let date in attendance) {

            if (!date.startsWith(month))
                continue;

            if (

                attendance[date][selectedStandard] &&
                attendance[date][selectedStandard][student.id]

            ) {

                const status =
                    attendance[date][selectedStandard][student.id];

                if (status === "Present") {

                    present++;

                } else {

                    absent++;

                }

            }

        }

               // ----------------------------
        // Total Days
        // ----------------------------

        const totalDays = present + absent;

        // ----------------------------
        // Attendance Percentage
        // ----------------------------

        const percentage = totalDays === 0
            ? 0
            : Math.round((present / totalDays) * 100);

        // Dashboard Cards

        totalPresent += present;
        totalAbsent += absent;

        // ----------------------------
        // Highest Attendance
        // ----------------------------

        if (totalDays > 0 && percentage > highestAttendance) {

            highestAttendance = percentage;

            highestStudent =
                student.name + " (" + percentage + "%)";

        }

        // ----------------------------
        // Lowest Attendance
        // ----------------------------

        if (totalDays > 0 && percentage < lowestAttendance) {

            lowestAttendance = percentage;

            lowestStudent =
                student.name + " (" + percentage + "%)";

        }

        // ----------------------------
        // Report Table Row
        // ----------------------------

        tbody.innerHTML += `

        <tr>

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td>Standard ${student.standard}</td>

            <td class="present">${present}</td>

            <td class="absent">${absent}</td>

            <td>${totalDays}</td>

            <td>${percentage}%</td>

        </tr>

        `;

    });

    // ==================================

        // ======================================
    // DASHBOARD CARDS
    // ======================================

    document.getElementById("totalStudents").textContent =
        students.length;

    document.getElementById("presentStudents").textContent =
        totalPresent;

    document.getElementById("absentStudents").textContent =
        totalAbsent;

    const totalAttendance = totalPresent + totalAbsent;

    let overallPercentage = 0;

    if (totalAttendance > 0) {

        overallPercentage =
            Math.round((totalPresent / totalAttendance) * 100);

    }

    document.getElementById("attendancePercentage").textContent =
        overallPercentage + "%";

    // ======================================
    // SUMMARY CARDS
    // ======================================

    document.getElementById("highestAttendance").textContent =
        highestStudent;

    document.getElementById("lowestAttendance").textContent =
        lowestStudent;

    // ======================================
    // NO DATA FOUND
    // ======================================

    if (students.length === 0) {

        tbody.innerHTML = `

        <tr>

            <td colspan="7" class="no-data">

                No Students Found

            </td>

        </tr>

        `;

    }

    // ======================================
    // NO ATTENDANCE RECORD
    // ======================================

    if (
        students.length > 0 &&
        totalAttendance === 0
    ) {

        tbody.innerHTML = `

        <tr>

            <td colspan="7" class="no-data">

                No Attendance Found For Selected Month

            </td>

        </tr>

        `;

        document.getElementById("presentStudents").textContent = "0";
        document.getElementById("absentStudents").textContent = "0";
        document.getElementById("attendancePercentage").textContent = "0%";

        document.getElementById("highestAttendance").textContent = "-";
        document.getElementById("lowestAttendance").textContent = "-";

    }

}