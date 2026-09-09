const state = {
  booking: JSON.parse(localStorage.getItem('kisanSetuBooking') || 'null'),
  queue: { Shivajinagar: 18, Hadapsar: 11, Baramati: 25 }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let currentLanguage = localStorage.getItem('kisanSetuLanguage') || 'en';

const translations = {
  en: {
    heroTitle: 'No More Waiting.<br><span>Know Your Turn.</span>', heroText: 'Book your procurement slot, track your queue, and know when it is your turn.',
    book: 'Book Procurement Slot', track: 'Track My Booking', centresOnline: 'Centres Online', dashboard: 'Your Procurement Dashboard',
    dashboardIntro: 'Book a slot, keep your digital token close, and follow your queue from one simple place.', refresh: 'Refresh Queue',
    centres: 'Centres online', live: 'Queue updates', toBook: 'To book a slot', quick: 'Quick Information', saveTitle: 'Save Time', saveText: 'Avoid unnecessary waiting at the centre.',
    tokenTitle: 'Get Your Token', tokenText: 'Receive a digital procurement token after booking.', turnTitle: 'Track Your Turn', turnText: 'See your live queue and estimated waiting time.', alertTitle: 'Get Alerts', alertText: 'Receive updates about delays and when your turn is approaching.',
    centreStatus: 'Check Centre Status', open: 'Open', inQueue: 'In Queue', estWait: 'Est. Wait', windows: 'Windows', bookHere: 'Book Here',
    howTitle: 'Procurement in 4 Simple Steps', chooseCentre: 'Choose Centre', chooseCentreText: 'Select the procurement centre that works for you.', getToken: 'Get Token', getTokenText: 'Book a slot and receive your digital token.', trackQueue: 'Track Queue', trackQueueText: 'See your position and estimated waiting time.', getAlert: 'Get Alert', getAlertText: 'Come to the centre when your turn is near.',
    important: 'Important:', notice: 'Please carry your required procurement documents and arrive at the centre before your selected slot.', faq: 'Frequently Asked Questions',
    bookingKicker: 'STEP 1 OF 1 · SLOT RESERVATION', bookingTitle: 'Book Procurement Slot', bookingText: 'Reserve your visit in less than a minute. Choose a centre, time and enter your contact details.',
    centreLabel: 'Procurement Centre', selectCentre: 'Select centre', date: 'Date', preferredTime: 'Preferred Time', selectTime: 'Select time', farmerName: 'Farmer Name', enterName: 'Enter your name', mobile: 'Mobile Number', mobileHint: 'Used only for booking updates.', confirm: 'Confirm Booking',
    trackerKicker: 'LIVE BOOKING TRACKER', trackerTitle: 'Track My Booking', trackerText: 'View your token, queue position and estimated waiting time in one place.', liveStatus: 'Live queue status', centreOpen: 'Centre open', yourToken: 'Your token', position: 'Position', estimatedWait: 'Estimated wait', refreshQueue: 'Refresh queue', cancel: 'Cancel booking',
    noBooking: 'No active booking yet', noBookingText: 'Book a procurement slot to get your digital token and live queue position.', noBookingFound: 'No booking found', noBookingFoundText: 'Book a slot first to see your live procurement queue.',
    alerts: 'Your Alerts', profile: 'Farmer Profile', guest: 'Guest farmer', guestText: 'Book a slot to keep your procurement details here.', bookingConfirmed: 'Booking confirmed', welcome: 'Welcome to KisanSetu', centreTimings: 'Centre timings', timingsText: 'All listed centres are open today from 8:00 AM to 4:00 PM.'
  },
  hi: {
    heroTitle: 'अब इंतज़ार नहीं।<br><span>अपनी बारी जानें।</span>', heroText: 'अपना खरीद स्लॉट बुक करें, कतार देखें और अपनी बारी का समय जानें।',
    book: 'खरीद स्लॉट बुक करें', track: 'मेरी बुकिंग देखें', centresOnline: 'केंद्र ऑनलाइन', dashboard: 'आपका खरीद डैशबोर्ड',
    dashboardIntro: 'स्लॉट बुक करें, अपना डिजिटल टोकन संभालकर रखें और एक ही जगह से कतार देखें।', refresh: 'कतार रीफ्रेश करें',
    centres: 'ऑनलाइन केंद्र', live: 'लाइव कतार अपडेट', toBook: 'स्लॉट बुक करने में', quick: 'त्वरित जानकारी', saveTitle: 'समय बचाएं', saveText: 'केंद्र पर बेवजह इंतज़ार से बचें।',
    tokenTitle: 'टोकन पाएं', tokenText: 'बुकिंग के बाद डिजिटल खरीद टोकन पाएं।', turnTitle: 'अपनी बारी देखें', turnText: 'लाइव कतार और अनुमानित प्रतीक्षा समय देखें।', alertTitle: 'सूचनाएं पाएं', alertText: 'देरी और आपकी बारी नज़दीक आने की जानकारी पाएं।',
    centreStatus: 'केंद्र की स्थिति देखें', open: 'खुला है', inQueue: 'कतार में', estWait: 'अनुमानित समय', windows: 'काउंटर', bookHere: 'यहां बुक करें',
    howTitle: '4 आसान चरणों में खरीद', chooseCentre: 'केंद्र चुनें', chooseCentreText: 'अपने लिए सुविधाजनक खरीद केंद्र चुनें।', getToken: 'टोकन पाएं', getTokenText: 'स्लॉट बुक करें और डिजिटल टोकन पाएं।', trackQueue: 'कतार देखें', trackQueueText: 'अपनी स्थिति और अनुमानित प्रतीक्षा समय देखें।', getAlert: 'सूचना पाएं', getAlertText: 'बारी नज़दीक आने पर केंद्र पहुंचें।',
    important: 'महत्वपूर्ण:', notice: 'अपने जरूरी खरीद दस्तावेज साथ लाएं और चुने हुए स्लॉट से पहले केंद्र पहुंचें।', faq: 'अक्सर पूछे जाने वाले सवाल',
    bookingKicker: 'चरण 1 में 1 · स्लॉट आरक्षण', bookingTitle: 'खरीद स्लॉट बुक करें', bookingText: 'एक मिनट से कम समय में अपनी यात्रा आरक्षित करें। केंद्र, समय और संपर्क जानकारी भरें।',
    centreLabel: 'खरीद केंद्र', selectCentre: 'केंद्र चुनें', date: 'तारीख', preferredTime: 'पसंदीदा समय', selectTime: 'समय चुनें', farmerName: 'किसान का नाम', enterName: 'अपना नाम लिखें', mobile: 'मोबाइल नंबर', mobileHint: 'केवल बुकिंग अपडेट के लिए उपयोग होगा।', confirm: 'बुकिंग पक्की करें',
    trackerKicker: 'लाइव बुकिंग ट्रैकर', trackerTitle: 'मेरी बुकिंग देखें', trackerText: 'टोकन, कतार में स्थिति और अनुमानित प्रतीक्षा समय एक जगह देखें।', liveStatus: 'लाइव कतार स्थिति', centreOpen: 'केंद्र खुला है', yourToken: 'आपका टोकन', position: 'स्थिति', estimatedWait: 'अनुमानित प्रतीक्षा', refreshQueue: 'कतार रीफ्रेश करें', cancel: 'बुकिंग रद्द करें',
    noBooking: 'अभी कोई सक्रिय बुकिंग नहीं', noBookingText: 'डिजिटल टोकन और लाइव कतार स्थिति पाने के लिए खरीद स्लॉट बुक करें।', noBookingFound: 'बुकिंग नहीं मिली', noBookingFoundText: 'लाइव खरीद कतार देखने के लिए पहले स्लॉट बुक करें।',
    alerts: 'आपकी सूचनाएं', profile: 'किसान प्रोफाइल', guest: 'अतिथि किसान', guestText: 'अपनी खरीद जानकारी रखने के लिए स्लॉट बुक करें।', bookingConfirmed: 'बुकिंग पक्की हुई', welcome: 'KisanSetu में आपका स्वागत है', centreTimings: 'केंद्र का समय', timingsText: 'सभी केंद्र आज सुबह 8 बजे से शाम 4 बजे तक खुले हैं।'
  }
};

const t = (key) => translations[currentLanguage][key] || translations.en[key] || key;

function applyLanguage() {
  const textMap = {
    '#onlineStatus span:last-child': 'centresOnline', '#heroTitle': 'heroTitle', '.hero-content > p': 'heroText', '#bookBtn [data-i18n="book"]': 'book',
    '#trackBtn [data-i18n="track"]': 'track', '#dashboardTitle': 'dashboard', '.dashboard-intro': 'dashboardIntro', '#refreshQueue span': 'refresh',
    '.dashboard-summary-card:nth-child(1) span:last-child': 'centres', '.dashboard-summary-card:nth-child(2) span:last-child': 'live', '.dashboard-summary-card:nth-child(3) span:last-child': 'toBook',
    '#quickTitle': 'quick', '.info-card:nth-child(1) h3': 'saveTitle', '.info-card:nth-child(1) p': 'saveText', '.info-card:nth-child(2) h3': 'tokenTitle', '.info-card:nth-child(2) p': 'tokenText', '.info-card:nth-child(3) h3': 'turnTitle', '.info-card:nth-child(3) p': 'turnText', '.info-card:nth-child(4) h3': 'alertTitle', '.info-card:nth-child(4) p': 'alertText',
    '#centresTitle': 'centreStatus', '#howTitle': 'howTitle', '.step:nth-child(1) h3': 'chooseCentre', '.step:nth-child(1) p': 'chooseCentreText', '.step:nth-child(2) h3': 'getToken', '.step:nth-child(2) p': 'getTokenText', '.step:nth-child(3) h3': 'trackQueue', '.step:nth-child(3) p': 'trackQueueText', '.step:nth-child(4) h3': 'getAlert', '.step:nth-child(4) p': 'getAlertText',
    '.notice-section strong': 'important', '.notice-section span': 'notice', '#faqTitle': 'faq', '#bookingModal .modal-kicker': 'bookingKicker', '#bookingModalTitle': 'bookingTitle', '#bookingModal .modal-header p': 'bookingText',
    'label[for="centre"]': 'centreLabel', 'label[for="date"]': 'date', 'label[for="time"]': 'preferredTime', 'label[for="farmerName"]': 'farmerName', 'label[for="mobile"]': 'mobile', '.field-hint': 'mobileHint', '#bookingForm button[type="submit"] span:first-child': 'confirm', '#statusModal .modal-kicker': 'trackerKicker', '#statusModalTitle': 'trackerTitle', '#statusModal .modal-header p': 'trackerText', '#alertsModalTitle': 'alerts', '#profileModalTitle': 'profile'
  };
  Object.entries(textMap).forEach(([selector, key]) => { const element = $(selector); if (element) element.innerHTML = t(key); });
  $('#centre option[value=""]').textContent = t('selectCentre');
  $$('#time option').forEach((option, index) => { if (index === 0) option.textContent = t('selectTime'); });
  $$('.open-badge').forEach((badge) => { const dot = badge.querySelector('i'); badge.innerHTML = ''; if (dot) badge.append(dot); badge.append(t('open')); });
  $$('.choose-centre').forEach((button) => { const arrow = button.querySelector('span'); button.innerHTML = t('bookHere') + ' '; if (arrow) button.append(arrow); });
  $$('.centre-stats').forEach((stats) => {
    const labels = stats.querySelectorAll('span');
    if (labels[0]) labels[0].textContent = t('inQueue');
    if (labels[1]) labels[1].textContent = t('estWait');
    if (labels[2]) labels[2].textContent = t('windows');
  });
  renderDashboard();
  if ($('#statusModal').classList.contains('open')) renderStatus();
  if ($('#alertsModal').classList.contains('open')) renderAlerts();
  if ($('#profileModal').classList.contains('open')) renderProfile();
}

function saveBooking() {
  localStorage.setItem('kisanSetuBooking', JSON.stringify(state.booking));
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function renderDashboard() {
  const target = $('#activeBooking');
  if (!state.booking) {
    target.innerHTML = `<div class="empty-state"><strong>${t('noBooking')}</strong>${t('noBookingText')}</div>`;
    return;
  }

  target.innerHTML = `
    <article class="booking-card">
      <div><span class="label">${currentLanguage === 'hi' ? 'आपका केंद्र' : 'YOUR CENTRE'}</span><strong>${state.booking.centre}</strong><small>${state.booking.date} · ${state.booking.time}</small></div>
      <div><span class="label">${currentLanguage === 'hi' ? 'डिजिटल टोकन' : 'DIGITAL TOKEN'}</span><strong><span class="token-pill">${state.booking.token}</span></strong></div>
      <div><span class="label">${currentLanguage === 'hi' ? 'अनुमानित पहुंच' : 'EST. ARRIVAL'}</span><strong>${state.booking.wait} min</strong><small>${state.booking.position} ${currentLanguage === 'hi' ? 'किसान आगे' : 'farmers ahead'}</small></div>
      <button class="small-btn" type="button" data-action="track">${currentLanguage === 'hi' ? 'लाइव स्थिति देखें' : 'View live status'} →</button>
    </article>`;
  target.querySelector('[data-action="track"]').addEventListener('click', () => { renderStatus(); openModal('statusModal'); });
}

function renderStatus() {
  const target = $('#statusContent');
  if (!state.booking) {
    target.innerHTML = `<div class="empty-state"><strong>${t('noBookingFound')}</strong>${t('noBookingFoundText')}</div>`;
    return;
  }
  const progress = Math.max(12, Math.min(92, 100 - state.booking.position * 4));
  target.innerHTML = `
    <div class="status-panel">
      <div class="status-top"><div><span class="modal-kicker">${state.booking.centre}</span><h3>${t('liveStatus')}</h3></div><span class="open-badge"><i></i> ${t('centreOpen')}</span></div>
      <div class="status-grid">
        <div class="status-stat"><span>${t('yourToken')}</span><strong>${state.booking.token}</strong></div>
        <div class="status-stat"><span>${t('position')}</span><strong>${state.booking.position} ${currentLanguage === 'hi' ? 'आगे' : 'ahead'}</strong></div>
        <div class="status-stat"><span>${t('estimatedWait')}</span><strong>${state.booking.wait} min</strong></div>
      </div>
      <div class="progress" aria-label="Queue progress"><span style="width:${progress}%"></span></div>
      <p><strong>${state.booking.position <= 3 ? (currentLanguage === 'hi' ? 'आपकी बारी जल्द आने वाली है।' : 'Your turn is coming up soon.') : (currentLanguage === 'hi' ? 'बारी नज़दीक आने पर घर से निकलें।' : 'You can leave home when your turn is near.')}</strong><br>${state.booking.date} · ${state.booking.time}</p>
      <div class="status-actions"><button class="btn btn-primary" type="button" id="refreshStatus">${t('refreshQueue')}</button><button class="outline-btn" type="button" id="cancelBooking">${t('cancel')}</button></div>
    </div>`;
  $('#refreshStatus').addEventListener('click', refreshQueue);
  $('#cancelBooking').addEventListener('click', cancelBooking);
}

function renderProfile() {
  const target = $('#profileContent');
  const booking = state.booking;
  target.innerHTML = booking ? `<div class="profile-list"><div class="profile-row"><span>${currentLanguage === 'hi' ? 'किसान का नाम' : 'Farmer name'}</span><strong>${booking.name}</strong></div><div class="profile-row"><span>${currentLanguage === 'hi' ? 'मोबाइल' : 'Mobile'}</span><strong>${booking.mobile}</strong></div><div class="profile-row"><span>${currentLanguage === 'hi' ? 'वर्तमान टोकन' : 'Current token'}</span><strong>${booking.token}</strong></div></div>` : `<div class="empty-state"><strong>${t('guest')}</strong>${t('guestText')}</div>`;
}

function renderAlerts() {
  $('#alertsContent').innerHTML = `<div class="alert-item"><span>🔔</span><div><strong>${state.booking ? t('bookingConfirmed') : t('welcome')}</strong><p>${state.booking ? `${currentLanguage === 'hi' ? 'टोकन' : 'Token'} ${state.booking.token} ${currentLanguage === 'hi' ? 'इस केंद्र पर सक्रिय है:' : 'is active at'} ${state.booking.centre}.` : t('noBookingText')}</p></div></div><div class="alert-item"><span>🌦️</span><div><strong>${t('centreTimings')}</strong><p>${t('timingsText')}</p></div></div>`;
}

function openBooking(centre = '') {
  openModal('bookingModal');
  if (centre) $('#centre').value = centre;
  $('#date').min = new Date().toISOString().split('T')[0];
}

function refreshQueue() {
  if (!state.booking) {
    showToast(t('noBookingFoundText'));
    return;
  }
  if (state.booking.position > 1) state.booking.position -= 1;
  state.booking.wait = Math.max(5, state.booking.position * 2);
  saveBooking();
  renderDashboard();
  renderStatus();
  showToast(currentLanguage === 'hi' ? `कतार रीफ्रेश हुई। आप ${state.booking.position} स्थान आगे हैं।` : `Queue refreshed. You are ${state.booking.position} ahead.`);
}

function cancelBooking() {
  state.booking = null;
  saveBooking();
  renderDashboard();
  closeModal('statusModal');
  showToast(currentLanguage === 'hi' ? 'आपकी बुकिंग रद्द कर दी गई है।' : 'Your booking has been cancelled.');
}

$('#bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const centre = $('#centre').value;
  const prefix = centre.split(' ')[0];
  const seed = { Shivajinagar: 'S', Hadapsar: 'H', Baramati: 'B' }[prefix] || 'K';
  const position = Math.max(4, (state.queue[prefix] || 12) - 2);
  state.booking = { centre, date: $('#date').value, time: $('#time').value, name: $('#farmerName').value.trim(), mobile: $('#mobile').value, token: `${seed}-${Math.floor(100 + Math.random() * 899)}`, position, wait: position * 2 };
  saveBooking();
  renderDashboard();
  closeModal('bookingModal');
  showToast(currentLanguage === 'hi' ? `बुकिंग पक्की हुई। आपका टोकन ${state.booking.token} है।` : `Booking confirmed. Your token is ${state.booking.token}.`);
  $('#bookingForm').reset();
  setTimeout(() => { renderStatus(); openModal('statusModal'); }, 450);
});

$$('[data-close]').forEach((button) => button.addEventListener('click', () => closeModal(button.dataset.close)));
$$('.modal').forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal.id); }));
$$('[data-action="book"]').forEach((button) => button.addEventListener('click', () => openBooking()));
$$('[data-action="track"]').forEach((button) => button.addEventListener('click', () => { renderStatus(); openModal('statusModal'); }));
$$('.choose-centre').forEach((button) => button.addEventListener('click', () => openBooking(button.dataset.centre)));
$('#bookBtn').addEventListener('click', () => openBooking());
$('#trackBtn').addEventListener('click', () => { renderStatus(); openModal('statusModal'); });
$('#refreshQueue').addEventListener('click', refreshQueue);
$('#navBooking').addEventListener('click', () => { renderStatus(); openModal('statusModal'); });
$('#navAlerts').addEventListener('click', () => { renderAlerts(); openModal('alertsModal'); });
$('#navProfile').addEventListener('click', () => { renderProfile(); openModal('profileModal'); });
$('#notificationDot').addEventListener('click', (event) => event.stopPropagation());

$$('.lang').forEach((button) => button.addEventListener('click', () => {
  $$('.lang').forEach((lang) => lang.classList.remove('active'));
  button.classList.add('active');
  currentLanguage = button.dataset.lang === 'hi' ? 'hi' : 'en';
  localStorage.setItem('kisanSetuLanguage', currentLanguage);
  applyLanguage();
  showToast(currentLanguage === 'hi' ? 'हिंदी भाषा चुनी गई।' : 'English language selected.');
}));

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') $$('.modal.open').forEach((modal) => closeModal(modal.id)); });

$$('.lang').forEach((button) => button.classList.toggle('active', button.dataset.lang === currentLanguage));
applyLanguage();
