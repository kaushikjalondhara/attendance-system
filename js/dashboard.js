// ===========================================
// DASHBOARD.JS
// ===========================================

// Selected Standard
const selectedStandard = localStorage.getItem("selectedStandard");

if (!selectedStandard) {
    window.location.href = "select-standard.html";
}

// Show Current Standard
document.getElementById("currentStandard").textContent =
    "Standard " + selectedStandard;

// Load Students
const students =
    JSON.parse(localStorage.getItem("students")) || [];

// Load Attendance
const attendance =
    JSON.parse(localStorage.getItem("attendance")) || {};

// Date Picker
const datePicker = document.getElementById("datePicker");

// Saved Date
const savedDate = localStorage.getItem("selectedDate");

if (savedDate) {
    datePicker.value = savedDate;
} else {
    datePicker.value = new Date().toISOString().split("T")[0];
}

// Dashboard Function
function loadDashboard(selectedDate) {

    document.getElementById("todayDate").textContent = selectedDate;

    const classStudents = students.filter(student =>
        student.standard == selectedStandard
    );

    const table = document.getElementById("attendanceTable");

    table.innerHTML = "";

    let totalStudents = classStudents.length;
    let presentStudents = 0;
    let absentStudents = 0;

    // Check Attendance Exists
    const attendanceExists =
        attendance[selectedDate] &&
        attendance[selectedDate][selectedStandard];

    if (totalStudents === 0) {

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

        let status = "Not Taken";

        if (
            attendanceExists &&
            attendance[selectedDate][selectedStandard][student.id]
        ) {

            status =
                attendance[selectedDate][selectedStandard][student.id];

        }

        if (status === "Present") {
            presentStudents++;
        } else if (status === "Absent") {
            absentStudents++;
        }

        table.innerHTML += `
            <tr>

                <td>
                    <img src="${student.photo || 'images/default-avatar.png'}"
                         class="student-photo">
                </td>

                <td>${student.roll}</td>

                <td>${student.name}</td>

                <td>Standard ${student.standard}</td>

                <td class="${
                    status === "Present"
                        ? "present"
                        : status === "Absent"
                        ? "absent"
                        : "not-taken"
                }">

                    ${status}

                </td>

            </tr>
        `;

    });

    document.getElementById("totalStudents").textContent =
        totalStudents;

    if (attendanceExists) {

        document.getElementById("presentStudents").textContent =
            presentStudents;

        document.getElementById("absentStudents").textContent =
            absentStudents;

        let percentage = 0;

        if (totalStudents > 0) {
            percentage = Math.round(
                (presentStudents / totalStudents) * 100
            );
        }

        document.getElementById("attendancePercentage").textContent =
            percentage + "%";

    } else {

        document.getElementById("presentStudents").textContent = "-";
        document.getElementById("absentStudents").textContent = "-";
        document.getElementById("attendancePercentage").textContent = "-";

    }

}

// First Load
loadDashboard(datePicker.value);

// Change Date
datePicker.addEventListener("change", function () {

    localStorage.setItem("selectedDate", this.value);

    loadDashboard(this.value);

});