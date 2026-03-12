MedSetu – Digital Prescription & Patient Management System

Overview
MedSetu is a secure, role-based digital healthcare platform connecting doctors, patients, and pharmacists. It allows:
-Doctors to create, manage, and share prescriptions digitally.
-Patients to track medical history, current medications, and health summaries.
-Pharmacists to verify, dispense, and record medication delivery.
>MedSetu empowers a medically literate society, improves patient safety, ensures proper adherence to medications, and strengthens community health.
This project aligns with Sustainable Development Goal 3: Good Health and Well-being.


Features
-Doctor Dashboard
-OTP-secured access to patient records.
-Patient health summary and history.
-Create prescriptions with medicines, course duration, and doctor details.
-QR code generation and PDF download of prescriptions.

Patient Dashboard
-View medical timeline with all past prescriptions.
-Track current medications and prescription validity.
-Summary of personal health metrics.

Pharmacist Dashboard
-Verify prescription using Prescription ID.
-Mark prescriptions as dispensed.
-Download or print prescriptions with status updates.

Security
-OTP-based access for patient records.
-Role-based dashboard access: Doctor / Patient / Pharmacist.
-Data persisted securely in localStorage (prototype stage).

Future Scopes
-Nationwide adoption across India, integrated into every mobile phone like Paytm or Google Pay.
-Integration with digital health IDs and telemedicine platforms.
-AI-assisted recommendations for adherence and early warning alerts.
-Multilingual support for rural and urban populations.
-Public health analytics and dashboards for authorities.

Link: https://medsetu-demo.netlify.app/
Usage
Login Credentials
Doctor: doctor@medsetu.com | 1234
Patient: patient@medsetu.com | 1234
Pharmacist: pharma@medsetu.com | 1234

Doctor Actions
1. Login as Doctor.
2. Generate OTP and verify to access patient info.
3. Create prescriptions, generate QR codes, download PDFs.
4. View patient history and summaries.

Patient Actions
1. Login as Patient.
2. View medical timeline and current medications.
3. Access personal health summary.

Pharmacist Actions
1. Login as Pharmacist.
2. Verify prescription using ID.
3. Mark as dispensed.
4. Download or print prescription.


Project Structure
MedSetu/
├─ index.html           # Main HTML file
├─ style.css            # Styles for dashboards
├─ app.js               # Core JavaScript logic
├─ README.md            # Project documentation
└─ assets/              # Optional images, icons, logos

Technologies Used
-HTML, CSS, JavaScript (Vanilla)
-QRCode.js – QR code generation
-jsPDF – PDF generation
-localStorage – Browser-based data persistence
(Future roadmap: migrate to Node.js + MongoDB for backend and React for frontend)

>Feature suggestions, bug fixes, and UX improvements are highly appreciated.

Impact & Vision
MedSetu aims to:
-Digitize healthcare records across India.
-Reduce medication errors and improve adherence.
-Educate patients for a medically literate society.
-Provide data-driven insights for public health authorities.

>Long-term vision: A nationwide mobile-first health platform, accessible to every citizen, ensuring safe, effective, and inclusive healthcare.
