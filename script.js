
document.addEventListener("DOMContentLoaded", function () {
  // GPA dynamic row creation
  const radios = document.querySelectorAll("input[name='Course_Count']");
  const tableBody = document.getElementById("courses-body");

  radios.forEach(radio => {
    radio.addEventListener("change", function () {
      const count = parseInt(this.value);
      tableBody.innerHTML = ""; 

      for (let i = 1; i <= count; i++) {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td><input type="text" name="course${i}" placeholder="Course ${i}" required></td>
          <td><input type="number" name="credit${i}" min="1" placeholder="Credits" required></td>
          <td>
            <select class="sgrade">
              <option value="-" class="title">Select your grade</option>
              <option value="AA">AA</option>
              <option value="BA">BA</option>
              <option value="BB">BB</option>
              <option value="CB">CB</option>
              <option value="CC">CC</option>
              <option value="DC">DC</option>
              <option value="DD">DD</option>
              <option value="FF">FF</option>
              <option value="NA">NA</option>
            </select>
          </td>
        `;

        tableBody.appendChild(row);
      }
    });
  });

  // CGPA dynamic row creation
  const cgpaRadios = document.querySelectorAll("input[name='number_of_semesters']");
  const cgpaBody = document.getElementById("cgpa-body");

  cgpaRadios.forEach(radio => {
    radio.addEventListener("change", function () {
      const count = parseInt(this.value);
      cgpaBody.innerHTML = "";

      for (let i = 1; i <= count; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><span>${i}</span></td>
          <td><input type="number" name="credits${i}" class="cgpa-credits" placeholder="Total credits ${i}" min="0" required></td>
          <td><input type="number" name="gpa${i}" class="cgpa-gpa" placeholder="GPA ${i}" step="0.01" min="0" max="4" required></td>
        `;
        cgpaBody.appendChild(row);
      }
    });
  });

  // Section toggle
  const switchToggle = document.querySelector(".theme-checkbox");
  const gpaSection = document.getElementById("gpa-section");
  const cgpaSection = document.getElementById("cgpa-section");

  switchToggle.addEventListener("change", function () {
    if (this.checked) {
      gpaSection.style.display = "none";
      cgpaSection.style.display = "block";
    } else {
      gpaSection.style.display = "block";
      cgpaSection.style.display = "none";
    }
  });

  // GPA calculation
  const gpaForm = document.getElementById("gpa-form");
  const resultSpan = document.getElementById("gpa");

  const gradeValues = {
    "AA": 4.0,
    "BA": 3.5,
    "BB": 3.0,
    "CB": 2.5,
    "CC": 2.0,
    "DC": 1.5,
    "DD": 1.0,
    "FF": 0.0
    // NA is ignored
  };

  gpaForm.addEventListener("submit", function (e) {
    e.preventDefault();


    const rows = document.querySelectorAll("#courses-body tr");
    const courses = [];
    rows.forEach(row => {
      const courseInput = row.querySelector("input[type='text']");
      const creditInput = row.querySelector("input[type='number']");
      const gradeSelect = row.querySelector("select");
      const credits = parseFloat(creditInput.value);
      const grade = gradeSelect.value;

      if (grade === "NA" || !(grade in gradeValues) || isNaN(credits)) return;

courses.push({
        course: courseInput.value,
        credit: credits,
        grade
      });
    });
     if (courses.length === 0) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter valid course credits and grades (excluding NA).',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    resultSpan.textContent = "";
    return;
  }
  const formData = new URLSearchParams();
courses.forEach((course, index) => {
  formData.append(`course${index}`, course.course);
  formData.append(`credit${index}`, course.credit);
  formData.append(`grade${index}`, course.grade);
});
formData.append("count", courses.length);

fetch("GpaApi.asp", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: formData.toString()
})
    .then(res => res.text())
    .then(text => {
   const value = parseFloat(text);
  resultSpan.textContent = value.toFixed(2);
  Swal.fire({
    title: 'GPA Calculated!',
    text: `Your GPA is: ${value.toFixed(2)}`,
    icon: 'success',
    timer: 5000,
    showConfirmButton: false
  });
    })
    .catch(err => {
      Swal.fire({
        title: 'Error!',
        text: 'Could not connect to the server.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
})
})

    /*rows.forEach(row => {
      const creditInput = row.querySelector("input[type='number']");
      const gradeSelect = row.querySelector("select");
      const credits = parseFloat(creditInput.value);
      const grade = gradeSelect.value;

      if (grade === "NA" || !(grade in gradeValues) || isNaN(credits)) return;

      totalCredits += credits;
      totalPoints += credits * gradeValues[grade];
    });

    if (totalCredits === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter valid course credits and grades (excluding NA).',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      resultSpan.textContent = "";
      return;
    }

    const gpa = totalPoints / totalCredits;
    resultSpan.textContent = gpa.toFixed(2);
    document.getElementById("gpa").textContent=gpa.toFixed(2);
    Swal.fire({
      title: 'GPA Calculated!',
      text: `Your GPA is: ${gpa.toFixed(2)}`,
      icon: 'success',
      timer:5000,
      showConfirmButton:false
    });
  });
});*/

const cgpaForm = document.getElementById("cgpa-form");
const cgpaResult = document.getElementById("cgpa");

cgpaForm.addEventListener("submit", function (e) {
  e.preventDefault();
 console.log("CGPA form submitted"); 
  const rows = document.querySelectorAll("#cgpa-body tr");
 const formData = new URLSearchParams();
let count = 0;

rows.forEach((row, index) => {
  const gpaInput = row.querySelector("input.cgpa-gpa");
  const creditInput = row.querySelector("input.cgpa-credits");
  const gpa = parseFloat(gpaInput?.value);
  const credits = parseFloat(creditInput?.value);

  if (!isNaN(gpa) && !isNaN(credits)) {
    formData.append(`gpa${count}`, gpa);
    formData.append(`credits${count}`, credits);
    count++;
  }
});
console.log("Collected data for CGPA:", formData.toString());

formData.append("count", count);

fetch("CgpaApi.asp", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: formData.toString()
})
  .then(res => res.text())
  .then(text => {
    const cgpa = parseFloat(text);
    cgpaResult.textContent = cgpa.toFixed(2);
    Swal.fire({
      title: 'CGPA Calculated!',
      text: `Your CGPA is: ${cgpa.toFixed(2)}`,
      icon: 'success',
      timer: 5000,
      showConfirmButton: false
    });
  })
  .catch(err => {
    Swal.fire({
      title: 'Error!',
      text: 'Could not connect to the server.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
});

