/* USERS */
const users = [
  { role: "doctor", email: "doctor@medsetu.com", password: "1234", name: "Dr Rahul", address: "123 Med Street" },
  { role: "patient", email: "patient@medsetu.com", password: "1234", name: "Amit", phone: "9876543210" },
  { role: "pharmacist", email: "pharma@medsetu.com", password: "1234", name: "City Pharmacy" }
];

let currentUser = null;
let lastPrescription = null;
let currentPrescriptionID = null;

/* LOGIN */
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.onclick = () => {
    const role = document.getElementById("roleSelect").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const user = users.find(u => u.role === role && u.email === email && u.password === pass);
    if (!user) { alert("Invalid login"); return; }

    currentUser = user;
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("logoutBtn").classList.remove("hidden");
    document.getElementById("sessionUser").innerText = "Logged in as " + role;
    document.getElementById(role + "Dashboard").classList.remove("hidden");

    renderTimeline();
    if (role === "patient") {
      renderPatientTimeline();
      renderCurrentMedications();
    }
  }
}

/* LOGOUT */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) logoutBtn.onclick = () => location.reload();

/* OTP GENERATION */
const generateOtpBtn = document.getElementById("generateOtpBtn");
if (generateOtpBtn) generateOtpBtn.onclick = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  localStorage.setItem("otp", otp);
  alert("OTP Generated: " + otp);
}

/* OTP VERIFY */
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
if (verifyOtpBtn) verifyOtpBtn.onclick = () => {
  const input = document.getElementById("otpInput").value;
  const saved = localStorage.getItem("otp");

  if(input === saved){
    localStorage.setItem("lastAccessDoctor", currentUser.name);
    localStorage.setItem("lastAccessDoctorAddress", document.getElementById("doctorAddress")?.value || "");

    alert("Access Granted!\n\nYour session will be active for next 30 minutes.");
    showLastAccess();
    renderPatientTimeline();
    renderCurrentMedications();
  } else {
    alert("Invalid OTP");
  }
}

/* SHOW LAST ACCESS */
function showLastAccess() {
  const doctorName = localStorage.getItem("lastAccessDoctor");
  const el = document.getElementById("lastDoctorAccess");
  if (doctorName && el) {
    const doctorAddress = localStorage.getItem("lastAccessDoctorAddress") || "";
    el.innerText = "Last accessed by: " + doctorName + (doctorAddress ? " | " + doctorAddress : "");
  } else if (el) {
    el.innerText = "Not accessed yet";
  }
}

/* DISPLAY PATIENT HEALTH SUMMARY CARD */
function displayPatientSummary() {
  const card = document.getElementById("patientSummaryCard");
  if (!card) return;
  card.classList.remove("hidden");

  document.getElementById("summaryName").innerText = "Name: " + document.getElementById("patientName").value;
  document.getElementById("summaryAgeGender").innerText = `Age/Gender: ${document.getElementById("patientAge").value} / ${document.getElementById("patientGender").value}`;
  document.getElementById("summaryWeightHeight").innerText = `Weight/Height: ${document.getElementById("patientWeight").value}kg / ${document.getElementById("patientHeight").value}cm`;
  document.getElementById("summaryCityAddress").innerText = `City/Address: ${document.getElementById("patientCity").value}, ${document.getElementById("patientAddress").value}`;
  document.getElementById("summaryAllergies").innerText = "Allergies: " + document.getElementById("allergies").value;
  document.getElementById("summaryDiseases").innerText = "Pre-existing Diseases: " + document.getElementById("existingDiseases").value;
  document.getElementById("summaryLastAccess").innerText = localStorage.getItem("lastAccessDoctor") || "";
}

/* ADD MEDICINE ROW */
const addMedBtn = document.getElementById("addMedBtn");
if (addMedBtn) addMedBtn.onclick = () => {
  const row = document.createElement("div");
  row.className = "med-row";
  row.innerHTML = `
    <select class="medName">
      <option>Paracetamol</option><option>Ibuprofen</option><option>Amoxicillin</option>
      <option>Azithromycin</option><option>Cetirizine</option><option>Metformin</option>
      <option>Losartan</option><option>Omeprazole</option><option>Atorvastatin</option>
      <option>Aspirin</option><option>Montelukast</option><option>Dolo 650</option>
      <option>Combiflam</option><option>Pantoprazole</option><option>Vitamin D</option>
      <option>Vitamin B12</option><option>Crocin</option><option>Insulin</option>
      <option>Levocetirizine</option><option>Salbutamol</option>
    </select>
    <select class="medDose">
      <option>1-0-1</option><option>1-1-1</option><option>0-1-0</option>
      <option>0-0-1</option><option>1-0-0</option><option>1-1-0</option>
      <option>1 tablet daily</option>
    </select>
    <select class="mealTiming"><option>After Meal</option><option>Before Meal</option></select>
    <input class="medDays" placeholder="Days">`;
  document.getElementById("medRows").appendChild(row);
}

/* CREATE PRESCRIPTION */
const createPrescriptionBtn = document.getElementById("createPrescriptionBtn");
if (createPrescriptionBtn) createPrescriptionBtn.onclick = () => {
  const id = "RX" + Date.now();
  const meds = [];
  document.querySelectorAll(".med-row").forEach(row => {
    const name = row.querySelector(".medName").value;
    const dose = row.querySelector(".medDose").value;
    const meal = row.querySelector(".mealTiming").value;
    const days = row.querySelector(".medDays").value;
    meds.push({ name, dose, meal, days });
  });

  const courseDays = parseInt(document.getElementById("courseDays").value || 7);
  const today = new Date();
  const expiryDate = new Date(today);
  expiryDate.setDate(today.getDate() + courseDays);

  const prescription = {
    id, doctor: currentUser.name, doctorAddress: currentUser.address || "",
    patientName: document.getElementById("patientName").value,
    age: document.getElementById("patientAge").value,
    city: document.getElementById("patientCity").value,
    address: document.getElementById("patientAddress").value,
    gender: document.getElementById("patientGender").value,
    weight: document.getElementById("patientWeight").value,
    height: document.getElementById("patientHeight").value,
    allergies: document.getElementById("allergies").value,
    existingDiseases: document.getElementById("existingDiseases").value,
    disease: document.getElementById("disease").value,
    courseDays, date: today.toLocaleDateString(), expiry: expiryDate.toLocaleDateString(),
    meds, dispensed: false
  };

  lastPrescription = prescription;
  currentPrescriptionID = id;
  const data = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  data.push(prescription);
  localStorage.setItem("prescriptions", JSON.stringify(data));

  document.getElementById("qrContainer").innerHTML = "";
  new QRCode(document.getElementById("qrContainer"), { text: id, width: 140, height: 140 });
  alert("Prescription created: " + id);

  renderTimeline();
  renderPatientTimeline();
  renderCurrentMedications();
}

/* TIMELINE */
function renderTimeline() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;
  const data = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  timeline.innerHTML = "";
  data.reverse().forEach(p => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `<strong>${p.id}</strong><br>${p.date}<br>Disease: ${p.disease}`;
    timeline.appendChild(div);
  });
}

/* PATIENT DASHBOARD: TIMELINE */
function renderPatientTimeline() {
  const timeline = document.getElementById("patientTimeline");
  if (!timeline) return;
  const data = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  timeline.innerHTML = "";
  data.reverse().forEach(p => {
    if (p.patientName === currentUser.name) {
      const div = document.createElement("div");
      div.className = "timeline-item";
      div.innerHTML = `
        <strong>${p.id}</strong><br>
        Disease: ${p.disease}<br>
        Medicines: ${p.meds.map(m => `${m.name} (${m.dose}, ${m.meal}, ${m.days} days)`).join(", ")}<br>
        Issued: ${p.date} | Valid Until: ${p.expiry}<br>
        Status: ${p.dispensed ? "Dispensed" : "Active"}
      `;
      timeline.appendChild(div);
    }
  });
}

/* CURRENT MEDICATIONS */
function renderCurrentMedications() {
  const container = document.getElementById("currentMedications");
  if (!container) return;
  container.innerHTML = "";

  const prescriptions = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  const today = new Date();
  const currentMeds = prescriptions.filter(p => p.patientName === currentUser.name && !p.dispensed && new Date(p.expiry) >= today);

  if (currentMeds.length === 0) {
    container.innerHTML = "<p>No current medications.</p>";
    return;
  }

  currentMeds.forEach(p => {
    const div = document.createElement("div");
    div.className = "medication-item";
    div.innerHTML = `<strong>Prescription: ${p.id}</strong><br>
                     Disease: ${p.disease}<br>
                     Medicines: ${p.meds.map(m => `${m.name} (${m.dose}, ${m.meal}, ${m.days} days)`).join(", ")}<br>
                     Issued: ${p.date} | Valid Until: ${p.expiry}<br>
                     Status: Active`;
    container.appendChild(div);
  });
}

/* DOWNLOAD PDF (DOCTOR) */
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
if (downloadPdfBtn) downloadPdfBtn.onclick = () => {
  if (!lastPrescription) { alert("Create prescription first"); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("MedSetu e-Prescription", 20, 20);
  doc.text(`Doctor: ${lastPrescription.doctor}`, 20, 40);
  doc.text(`Address: ${lastPrescription.doctorAddress}`, 20, 50);
  doc.text(`Patient: ${lastPrescription.patientName}`, 20, 60);
  doc.text(`Disease: ${lastPrescription.disease}`, 20, 70);
  doc.text(`Issued: ${lastPrescription.date}`, 20, 80);
  doc.text(`Valid Until: ${lastPrescription.expiry}`, 20, 90);
  let y = 100;
  lastPrescription.meds.forEach(m => {
    doc.text(`${m.name} | ${m.dose} | ${m.meal} | ${m.days} days`, 20, y);
    y += 10;
  });
  doc.text(`Doctor Signature: ${lastPrescription.doctor}`, 20, y + 20);
  doc.save(lastPrescription.id + ".pdf");
}

/* PHARMACIST DASHBOARD */
const lookupBtn = document.getElementById("lookupBtn");
if (lookupBtn) lookupBtn.onclick = () => {
  const id = document.getElementById("lookupId").value;
  const data = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  const p = data.find(pr => pr.id === id);
  currentPrescriptionID = id;

  const result = document.getElementById("lookupResult");
  const view = document.getElementById("prescriptionView");
  if (p) {
    let status = "Active"; if (p.dispensed) status = "Dispensed"; if (new Date() > new Date(p.expiry)) status = "Expired";
    result.innerText = `Prescription Found\nStatus: ${status}`;
    view.innerHTML = `<p>Patient: ${p.patientName}</p>
                      <p>Disease: ${p.disease}</p>
                      <p>Medications: ${p.meds.map(m => `${m.name} (${m.dose}, ${m.meal}, ${m.days} days)`).join(", ")}</p>
                      <p>Course Days: ${p.courseDays}</p>
                      <p>Doctor: ${p.doctor}</p>
                      <p>Issued: ${p.date}</p>
                      <p>Expiry: ${p.expiry}</p>`;
  } else { result.innerText = "Prescription Not Found"; view.innerHTML = ""; }
}

/* PRINT & DOWNLOAD (PHARMACIST) */
const printBtn = document.getElementById("printBtn");
if (printBtn) printBtn.onclick = () => {
  const view = document.getElementById("prescriptionView");
  if (view.innerHTML) { const w = window.open(""); w.document.write(view.innerHTML); w.print(); }
  else alert("No prescription selected");
}
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) downloadBtn.onclick = () => {
  const p = JSON.parse(localStorage.getItem("prescriptions") || "[]").find(pr => pr.id === currentPrescriptionID);
  if (!p) return alert("No prescription selected");
  const { jsPDF } = window.jspdf; const doc = new jsPDF();
  doc.text(`Prescription ID: ${p.id}`, 20, 20);
  doc.text(`Patient: ${p.patientName}`, 20, 30);
  doc.text(`Disease: ${p.disease}`, 20, 40);
  doc.text(`Doctor: ${p.doctor}`, 20, 50);
  doc.text(`Date: ${p.date}`, 20, 60);
  doc.text(`Expiry: ${p.expiry}`, 20, 70);
  let y = 80;
  p.meds.forEach(m => { doc.text(`${m.name} | ${m.dose} | ${m.meal} | ${m.days}d`, 20, y); y += 10; });
  doc.save(`${p.id}.pdf`);
}

/* MARK AS DISPENSED */
const dispenseBtn = document.getElementById("dispenseBtn");
if (dispenseBtn) dispenseBtn.onclick = () => {
  let data = JSON.parse(localStorage.getItem("prescriptions") || "[]");
  data = data.map(p => {
    if (p.id === currentPrescriptionID) { p.dispensed = true; p.dispensedDate = new Date().toLocaleDateString(); p.dispensedBy = currentUser.name; }
    return p;
  });
  localStorage.setItem("prescriptions", JSON.stringify(data));
  alert("Marked as dispensed");
  renderTimeline();
  renderPatientTimeline();
  renderCurrentMedications();
  lookupBtn.onclick(); // refresh pharmacist view
}

/* REPORT UPLOAD */
const reportUpload = document.getElementById("reportUpload");
if (reportUpload) reportUpload.onchange = () => {
  const file = reportUpload.files[0];
  document.getElementById("reportStatus").innerText = "Uploaded: " + file.name;
}

/* Patient Summary Card Updates */
const patientFields = [
  "patientName","patientAge","patientCity","patientAddress",
  "patientGender","patientWeight","patientHeight","allergies","existingDiseases"
];
patientFields.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", displayPatientSummary);
});