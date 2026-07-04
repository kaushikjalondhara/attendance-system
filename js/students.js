// ==============================
// Students Page
// ==============================

// Selected Standard
const selectedStandard = localStorage.getItem("selectedStandard");

if (!selectedStandard) {
    window.location.href = "select-standard.html";
}

// Show Current Standard
document.getElementById("currentStandard").textContent =
    "Standard " + selectedStandard;

document.getElementById("currentClassText").textContent =
    "Standard " + selectedStandard + " Students";

// Load Students
let students = JSON.parse(localStorage.getItem("students")) || [];

// Table Body
const table = document.getElementById("studentTable");

// ==============================
// Display Students
// ==============================

function displayStudents(search = "") {

    table.innerHTML = "";

    // Filter Standard Wise
    let filteredStudents = students.filter(student =>
        student.standard == selectedStandard
    );

    // Search
    if (search !== "") {

        filteredStudents = filteredStudents.filter(student =>

            student.name.toLowerCase().includes(search.toLowerCase()) ||

            student.roll.toString().includes(search)

        );

    }

    // No Student

    if (filteredStudents.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="6" class="no-data">

                No Students Found

            </td>

        </tr>

        `;

        return;

    }

    // Table

    filteredStudents.forEach(student => {

        table.innerHTML += `

        <tr>

            <td>
                <img src="${student.photo || 'images/default-avatar.png'}"
                     class="student-photo">
            </td>

            <td>${student.roll}</td>

            <td>${student.name}</td>

            <td>Standard ${student.standard}</td>

            <td>${student.mobile}</td>

            <td>

                <div class="action-btn">

                    <button class="edit-btn"
                        onclick="editStudent(${student.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button class="delete-btn"
                        onclick="deleteStudent(${student.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

// ==============================
// Search
// ==============================

document.getElementById("searchStudent")

.addEventListener("keyup", function () {

    displayStudents(this.value);

});

// ==============================
// Delete Student
// ==============================

function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;

    students = students.filter(student => student.id != id);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

}

// ==============================
// Edit Student
// ==============================

function editStudent(id) {

    localStorage.setItem("editStudentId", id);

    window.location.href = "add-student.html";

}

// ==============================
// First Load
// ==============================

displayStudents();