# MediCare Project - Manual Test Cases

## Project Name
MediCare - Hospital Chain Management System

## Testing Type
Manual Testing, Functional Testing, UI Testing, API Flow Testing

---

## Test Case Summary

| Module | Total Test Cases |
|---|---:|
| Authentication | 4 |
| Patient Dashboard | 4 |
| Appointment Booking | 7 |
| My Appointments | 5 |
| Reports Module | 7 |
| Doctor Module | 4 |
| Admin Module | 3 |
| Payment | 4 |

---

## Authentication Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_AUTH_001 | Authentication | User opens login page | Open `/login` | Login page should display properly | Pass |
| TC_AUTH_002 | Authentication | Login with valid credentials | Enter valid email/password and login | User should login successfully | Pass |
| TC_AUTH_003 | Authentication | Access dashboard without login | Open `/dashboard` without login | User should be redirected/login required | Pass |
| TC_AUTH_004 | Authentication | Logout user | Click logout | User session should end successfully | Pass |

---

## Patient Dashboard Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_DASH_001 | Patient Dashboard | Open dashboard | Login and open `/dashboard` | Dashboard cards should be visible | Pass |
| TC_DASH_002 | Patient Dashboard | Open My Profile card | Click My Profile | User should navigate to `/my-profile` | Pass |
| TC_DASH_003 | Patient Dashboard | Open My Appointments card | Click My Appointments | User should navigate to `/my-appointments` | Pass |
| TC_DASH_004 | Patient Dashboard | Open My Reports card | Click My Reports | User should navigate to `/my-reports` | Pass |

---

## Appointment Booking Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_APP_001 | Appointment | View doctors list | Open `/doctors` | Doctors list should display | Pass |
| TC_APP_002 | Appointment | View doctor details | Click any doctor | Doctor detail page should open | Pass |
| TC_APP_003 | Appointment | Select date and time | Choose available slot | Selected slot should be visible | Pass |
| TC_APP_004 | Appointment | Book appointment with cash | Fill details and choose cash | Appointment should be saved as Pending | Pass |
| TC_APP_005 | Appointment | Book appointment with online payment | Choose online payment | Stripe checkout should open | Pass |
| TC_APP_006 | Appointment | Payment success verification | Complete payment | Appointment should become Confirmed | Pass |
| TC_APP_007 | Appointment | Missing required details | Submit without required fields | Validation/error should display | Pass |

---

## My Appointments Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_MYAPP_001 | My Appointments | View appointment list | Open `/my-appointments` | User appointments should display | Pass |
| TC_MYAPP_002 | My Appointments | Check payment status | View paid appointment | Payment status should show Confirmed/Paid | Pass |
| TC_MYAPP_003 | My Appointments | Check cash appointment | View cash appointment | Status should show Pending | Pass |
| TC_MYAPP_004 | My Appointments | Cancel appointment | Click cancel | Appointment should be cancelled | Pass |
| TC_MYAPP_005 | My Appointments | Empty appointment list | Login with no appointment user | Empty message should display | Pass |

---

## Reports Module Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_REP_001 | Reports | Open My Reports page | Open `/my-reports` | Reports page should display | Pass |
| TC_REP_002 | Reports | Upload valid report | Upload PDF/image report | Report should upload successfully | Pass |
| TC_REP_003 | Reports | View uploaded report | Click view report | Report should open/display | Pass |
| TC_REP_004 | Reports | Search reports | Enter report name/type | Matching reports should display | Pass |
| TC_REP_005 | Reports | Filter by report type | Select report type filter | Filtered reports should display | Pass |
| TC_REP_006 | Reports | Sort reports | Select newest/oldest | Reports should sort correctly | Pass |
| TC_REP_007 | Reports | Delete report | Click delete | Report should be removed | Pass |

---

## Doctor Module Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_DOC_001 | Doctor | Doctor login | Enter doctor credentials | Doctor dashboard should open | Pass |
| TC_DOC_002 | Doctor | View appointments | Open doctor dashboard | Appointment list should display | Pass |
| TC_DOC_003 | Doctor | View patient history | Click View Patient History | Patient reports/history should display | Pass |
| TC_DOC_004 | Doctor | Unauthorized access check | Try accessing other hospital patient data | Access should be restricted | Pass |

---

## Admin Module Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_ADMIN_001 | Admin | Admin login | Login with admin credentials | Admin dashboard should open | Pass |
| TC_ADMIN_002 | Admin | Add doctor | Fill doctor form and submit | Doctor should be added successfully | Pass |
| TC_ADMIN_003 | Admin | View dashboard stats | Open admin dashboard | Stats/cards should display | Pass |

---

## Payment Test Cases

| TC ID | Module | Test Scenario | Test Steps | Expected Result | Status |
|---|---|---|---|---|---|
| TC_PAY_001 | Payment | Stripe checkout opens | Choose online payment | Stripe page should open | Pass |
| TC_PAY_002 | Payment | Successful payment | Complete test payment | Payment should be confirmed | Pass |
| TC_PAY_003 | Payment | Failed/cancelled payment | Cancel payment | Appointment should not be confirmed | Pass |
| TC_PAY_004 | Payment | Cash payment | Choose cash option | Payment status should remain Pending | Pass |

---

## Final Testing Status

Overall Result: Pass

Tested By: Deeksha Yadav  
Project: MediCare  