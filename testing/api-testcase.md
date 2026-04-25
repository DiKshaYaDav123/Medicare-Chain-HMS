# MediCare Project - API Testing Documentation

## Base URL

http://localhost:4000

---

## 1. Patient Profile API

### Get Patient Profile

Method: GET  
Endpoint: /api/patient/me

Headers:

Authorization: Bearer TOKEN

Expected Result:

- Status Code: 200 OK
- Patient profile data should be returned

---

## 2. Appointment APIs

### Get My Appointments

Method: GET  
Endpoint: /api/appointments/me

Headers:

Authorization: Bearer TOKEN

Expected Result:

- Status Code: 200 OK
- Logged-in user's appointments should be returned

---

### Book Appointment

Method: POST  
Endpoint: /api/appointments

Expected Result:

- Status Code: 201 Created
- Appointment should be created successfully

---

### Confirm Stripe Payment

Method: GET  
Endpoint: /api/appointments/confirm?session_id=SESSION_ID

Expected Result:

- Status Code: 200 OK
- Payment should be confirmed
- Appointment status should be updated

---

## 3. Report APIs

### Get My Reports

Method: GET  
Endpoint: /api/reports/me

Headers:

Authorization: Bearer TOKEN

Expected Result:

- Status Code: 200 OK
- User reports should be returned

---

### Upload Report

Method: POST  
Endpoint: /api/reports

Headers:

Authorization: Bearer TOKEN

Body:

- title
- reportType
- doctorName
- hospitalName
- recordDate
- file

Expected Result:

- Status Code: 200 OK / 201 Created
- Report should upload successfully

---

## 4. Doctor APIs

### Get Doctors List

Method: GET  
Endpoint: /api/doctors

Expected Result:

- Status Code: 200 OK
- Doctors list should be returned

---

### Add Doctor

Method: POST  
Endpoint: /api/doctors

Expected Result:

- Status Code: 201 Created
- Doctor should be added successfully

---

## 5. Service Appointment APIs

### Get Service Appointments

Method: GET  
Endpoint: /api/service-appointments

Expected Result:

- Status Code: 200 OK
- Service appointment data should be returned

---

## Final API Testing Status

Overall Result: Pass

Tested By: Deeksha Yadav  
Project: MediCare