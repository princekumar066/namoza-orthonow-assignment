// OrthoNow — GTM dataLayer Push Implementation
// Task 01 | Namoza Developer Assignment
// Developer: Prince Kumar

window.dataLayer = window.dataLayer || [];

// STEP 1: User selects clinic + specialty
function trackStep1() {
  window.dataLayer.push({
    'event':           'booking_step_complete',
    'step_number':     1,
    'step_name':       'location_specialty_selected',
    'clinic_location': document.querySelector('#clinic-select').value,
    'specialty':       document.querySelector('#specialty-select').value,
    'timestamp':       new Date().toISOString()
  });
}

// STEP 2: User enters name, phone, date
function trackStep2(clinicLocation, specialty) {
  window.dataLayer.push({
    'event':           'booking_step_complete',
    'step_number':     2,
    'step_name':       'patient_details_entered',
    'clinic_location': clinicLocation,
    'specialty':       specialty,
    'preferred_date':  document.querySelector('#date-picker').value,
    'timestamp':       new Date().toISOString()
  });
}

// STEP 3: Booking confirmed
function trackStep3(clinicLocation, specialty, date) {
  window.dataLayer.push({
    'event':           'booking_confirmed',
    'step_number':     3,
    'step_name':       'booking_confirmation',
    'clinic_location': clinicLocation,
    'specialty':       specialty,
    'preferred_date':  date,
    'form_id':         'orthonow_booking_form',
    'timestamp':       new Date().toISOString()
  });
}

// CALL NOW button click
function trackCallNow(clinicName, position) {
  window.dataLayer.push({
    'event':           'call_now_click',
    'clinic_name':     clinicName,
    'button_position': position,
    'page_location':   window.location.href,
    'timestamp':       new Date().toISOString()
  });
}

// WHATSAPP widget click
function trackWhatsApp(clinicName) {
  window.dataLayer.push({
    'event':         'whatsapp_click',
    'clinic_name':   clinicName,
    'widget_type':   'floating_button',
    'page_location': window.location.href,
    'timestamp':     new Date().toISOString()
  });
}

// PDF form submit (gated download)
function trackPDFSubmit(formId, clinicName) {
  window.dataLayer.push({
    'event':         'pdf_form_submit',
    'form_id':       formId,
    'clinic_name':   clinicName,
    'page_location': window.location.href,
    'timestamp':     new Date().toISOString()
  });
}
