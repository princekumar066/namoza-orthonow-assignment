# Task 03 — Integration Design
OrthoNow x HubSpot x Karix x Google Ads

---

## Architecture

When a patient submits the consultation form, the page JavaScript sends the form data — name, phone, and clinic preference — to a Make.com webhook via a POST
request. I chose Make.com over Zapier because it offers more granular error handling, parallel branch execution, and lower cost at this scale. A direct API call 
from the WordPress site was ruled out since OrthoNow has no backend server environment to host custom logic safely. A native HubSpot Forms embed was also ruled
out because it cannot simultaneously trigger the Karix WhatsApp message in the same flow. Make.com receives the webhook and runs two branches in parallel.
Branch one calls the HubSpot Contacts API to create or update the patient record with name, phone, clinic preference, source set to Google Ads Consultation 
Landing Page, and lead status set to New Enquiry. Branch two calls the Karix WhatsApp Business API with the patient phone number and a pre-approved message
template confirming their enquiry. The Google Ads conversion fires independently via GTM — the consultation_form_submitted dataLayer event triggers a GA4 tag 
which is imported into Google Ads as a conversion action and does not pass through Make.com at all.

---

## Deduplication

A critical issue in this setup is contact deduplication. HubSpot deduplicates contacts by email address by default, but OrthoNow's form collects only name
and phone with no email field. Without custom handling, every form submission creates a new contact record regardless of whether that patient already exists,
resulting in duplicate entries and the sales team calling the same patient multiple times. To solve this, Make.com must run a search step before creating any
contact — querying HubSpot's Contacts API by phone number first. If a matching record is found, the existing contact is updated with the latest submission data.
If no match is found, a new contact is created. This search-before-create logic replaces HubSpot's default email deduplication with phone-based deduplication,
which is the correct approach for an Indian healthcare lead generation context where phone is the primary identifier.

---

## Biggest failure point

The single biggest failure point is the Make.com webhook. If it goes down, no contact is created and no WhatsApp is sent. My fallback has three layers. 
First, Make.com's built-in retry logic fires  up to three times on any failed execution automatically. Second, a parallel Google Sheets branch runs in the
same Make.com scenario and logs every form submission as a raw backup regardless of whether the HubSpot or Karix branches succeed. Third, a Make.com error
alert emails a monitored inbox if the scenario error rate exceeds five percent in any one hour.

---

## WhatsApp 2-minute SLA

Three things could break the two-minute WhatsApp SLA: Make.com queue delays under high submission volume, Karix API rate limits, or an invalid phone number 
submitted by the patient. To monitor the SLA I would use Make.com's execution logs to track the timestamp gap between webhook received and Karix API called.
Karix delivery receipts would be webhocked back into a Google Sheet logging sent, delivered, and failed status per submission. A weekly reconciliation would
compare GA4 form submission count against HubSpot contacts created — any gap signals a pipeline break.
