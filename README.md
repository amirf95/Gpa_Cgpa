# 🎓 GPA & CGPA Calculator Web App

This is a full-stack GPA and CGPA calculator designed for academic tracking and performance evaluation. It features a dynamic and responsive front-end, ASP-based server logic, and a Microsoft Access database for persistent data storage.

---

## ✨ Features

- 🔄 Toggle between **GPA** and **CGPA** calculator
- 📥 Dynamically generated input forms based on user selection
- ✅ Real-time GPA/CGPA calculation and result display
- 📄 Stores course and semester data into a Microsoft Access (`.mdb`) database
- 🌌 Animated background with custom neon-styled UI
- 🔔 SweetAlert2 popups for interactive user feedback

---

## 🛠 Technologies Used

| Layer         | Tech                           |
|---------------|--------------------------------|
| Front-End     | HTML, CSS, JavaScript          |
| Back-End      | ASP Classic (`.asp`)           |
| Database      | Microsoft Access (`.mdb`)      |
| Styling Tools | Custom CSS, Google Fonts       |
| Alerts        | [SweetAlert2](https://sweetalert2.github.io/) |
| Animation     | Canvas-based swirl background  |

---

## 📁 Project Structure

📦 GPA_CGPA_Calculator/
├── index.html # Main page
├── script.js # GPA & CGPA form logic
├── styles.css # Neon theme & form styling
├── GpaApi.asp # Handles GPA submission + DB storage
├── CgpaApi.asp # Handles CGPA submission + DB storage
├── book.mdb # Access database
└── background/ # Canvas animation files


---

## ⚙️ How It Works

### 🧮 GPA Calculation
1. User selects number of courses.
2. Fills in course names, credits, and grades.
3. Data is sent via `fetch()` to `GpaApi.asp`.
4. ASP script calculates GPA and stores records in `GPA_Records` table.

### 📊 CGPA Calculation
1. User selects number of semesters.
2. Inputs GPA and total credits for each.
3. Data is sent to `CgpaApi.asp`.
4. ASP script inserts into `CGPA_Records` and computes CGPA.

---

## 🛑 Requirements

- A Windows machine with:
  - IIS (Internet Information Services)
  - ASP Classic support
  - Microsoft Access Database Engine (Jet 4.0)
- Place all files under:  
  `C:\inetpub\wwwroot\GPA_calculator\`

---

## 🚀 Getting Started

1. Copy the project to your IIS root folder.
2. Open `http://localhost/GPA_calculator/` in your browser.
3. Choose GPA or CGPA mode.
4. Fill in the form → click "Calculate" → see your result!

---

## 🔐 Permissions

Make sure `book.mdb` has **read/write permissions** for the IIS user:
- Right-click → Properties → Security → Add `IUSR` or `Everyone` → Allow Modify.

---

## ✅ Future Improvements

- Add login system to store data per user
- Display full GPA/CGPA history
- Export reports to PDF
- Support for multiple grading systems (percentage, 10-point, letter)

---

## 👤 Author

**Amir Fenina**  
📧 [amirfenina03@gmail.com](mailto:amirfenina03@gmail.com)  
🌐 Project Repository: [GitHub - amirf95/Gpa_Cgpa](https://github.com/amirf95/Gpa_Cgpa)

---

## 📸 Screenshots

> *(Include screenshots of GPA and CGPA forms, results, and background visuals here)*

---

## 📜 License

MIT License — feel free to use and modify with credit.

