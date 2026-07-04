// ==========================================
// ADD / EDIT STUDENT
// ==========================================

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

// Form
const form = document.getElementById("studentForm");

// Load Students
let students = JSON.parse(localStorage.getItem("students")) || [];

// Edit Student ID
let editId = localStorage.getItem("editStudentId");

// Student Photo
let studentPhoto = "";

// ==========================================
// PHOTO UPLOAD
// ==========================================

const photoInput = document.getElementById("photo");

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        studentPhoto = e.target.result;

        document.getElementById("photoPreview").src = studentPhoto;

    };

    reader.readAsDataURL(file);

});

// ================================
// EDIT MODE
// ================================

if (editId) {

    let student = students.find(s => s.id == editId);

    if (student) {

        document.getElementById("roll").value = student.roll;
        document.getElementById("name").value = student.name;
        document.getElementById("mobile").value = student.mobile;
        document.getElementById("email").value = student.email;
        document.getElementById("address").value = student.address;

        studentPhoto = student.photo || "";

        if (studentPhoto) {
            document.getElementById("photoPreview").src = studentPhoto;
        }

    }

}

// ================================
// SAVE STUDENT
// ================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let roll = document.getElementById("roll").value.trim();
    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();

    // Validation

    if (
        roll === "" ||
        name === "" ||
        mobile === ""
    ) {

        alert("Please Fill All Required Fields");

        return;

    }

    // Duplicate Roll Check

    let duplicate = students.find(student =>

        student.roll == roll &&
        student.standard == selectedStandard &&
        student.id != editId

    );

    if (duplicate) {

        alert("Roll Number Already Exists!");

        return;

    }

    // ============================
    // EDIT
    // ============================

    if (editId) {

        let index = students.findIndex(student => student.id == editId);

        students[index] = {

            id: Number(editId),

            roll,

            name,

            mobile,

            email,

            address,

            standard: selectedStandard,

            photo: studentPhoto

        };

        localStorage.removeItem("editStudentId");

        alert("Student Updated Successfully");

    }

    // ============================
    // ADD
    // ============================

    else {

        students.push({

            id: Date.now(),

            roll,

            name,

            mobile,

            email,

            address,

            standard: selectedStandard,

            photo: studentPhoto

        });

        alert("Student Added Successfully");

    }

    // Save

    localStorage.setItem("students", JSON.stringify(students));

    // Redirect

    window.location.href = "students.html";

});