# MediCare Project - Bug Report Documentation

## Project Name
MediCare - Hospital Chain Management System

## Tested By
Deeksha Yadav

---

## Bug Report Format

| Bug ID | Module | Bug Description | Steps to Reproduce | Expected Result | Actual Result | Severity | Status |
|---|---|---|---|---|---|---|---|

---

## Bug List

### Bug 1

| Field | Details |
|---|---|
| Bug ID | BUG_001 |
| Module | Authentication |
| Description | User is able to access dashboard without login (in some cases) |
| Steps | Open `/dashboard` without login |
| Expected | User should be redirected to login |
| Actual | Dashboard loads |
| Severity | High |
| Status | Fixed |

---

### Bug 2

| Field | Details |
|---|---|
| Bug ID | BUG_002 |
| Module | Appointment |
| Description | Appointment booking allows empty fields |
| Steps | Submit form without required data |
| Expected | Validation error should display |
| Actual | Appointment created |
| Severity | Medium |
| Status | Fixed |

---

### Bug 3

| Field | Details |
|---|---|
| Bug ID | BUG_003 |
| Module | Reports |
| Description | Uploaded PDF not opening in browser |
| Steps | Upload PDF and click view |
| Expected | PDF should open in new tab |
| Actual | Download starts instead |
| Severity | Low |
| Status | Fixed |

---

### Bug 4

| Field | Details |
|---|---|
| Bug ID | BUG_004 |
| Module | Payment |
| Description | Payment success not updating appointment status immediately |
| Steps | Complete Stripe payment |
| Expected | Status should change to Confirmed |
| Actual | Still shows Pending |
| Severity | High |
| Status | Fixed |

---

## Bug Summary

| Severity | Count |
|---|---:|
| High | 2 |
| Medium | 1 |
| Low | 1 |

---

## Final Notes

- All major bugs have been identified and fixed
- Application is stable and working as expected