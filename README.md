# OrthoNow — GTM Event Schema
**Namoza Developer Assignment — Task 01**
**Developer:** Prince Kumar

---

## The Problem
OrthoNow has zero tracking. No GTM, no GA4 events.
Booking page converts at 2.1% vs 6-8% industry benchmark.

---

## GTM Event Schema

| Event Name | Trigger Type | Key Parameters | GA4 Report |
|---|---|---|---|
| `booking_step_complete` | Custom dataLayer | step_number, step_name, clinic_location, specialty | Funnel Exploration |
| `booking_confirmed` | Custom dataLayer | clinic_location, specialty, preferred_date, form_id | Conversions Report |
| `booking_abandoned` | Timer + dataLayer | last_step_reached, time_on_step, clinic_location | Funnel Drop-off |
| `call_now_click` | Click — All Elements | page_location, clinic_name, button_position | Events + Audiences |
| `whatsapp_click` | Click — Just Links | page_location, clinic_name, widget_type | Events Report |
| `pdf_form_submit` | Form Submission | form_id, page_location, clinic_name | Lead Gen Report |
| `pdf_download_start` | Click — Just Links | file_name, page_location, clinic_name | Events Report |
| `clinic_page_view` | Page View — URL match | clinic_name, city, page_path | Pages + Audiences |
| `blog_scroll_depth` | Scroll Depth 25/50/75/90% | scroll_threshold, article_title, page_path | Engagement Report |

---

## Google Ads Conversion
**Chosen event:** `booking_confirmed`
**Reason:** Only event that confirms all 3 booking steps completed.
Highest intent signal. Directly maps to OrthoNow revenue.

---

## dataLayer Code
See `/task-01/datalayer.js` for all push implementations.
