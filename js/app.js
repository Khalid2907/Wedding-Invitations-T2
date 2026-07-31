/* ============================================================
   AURORA LUXURY INVITATION — Complete Main App (app.js)
   ============================================================ */

import { LanguageManager, dictionary } from './language.js';
import { CountdownTimer } from './countdown.js';
import { GalleryManager } from './gallery.js';
import { AnimationEngine } from './animations.js';
import { initScrollController } from './scroll.js';
import { copyToClipboard, generateGoogleCalendarUrl, downloadIcsFile } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Language i18n Manager
  const langManager = new LanguageManager();
  langManager.init();

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => langManager.toggle());
  }

  // 2. Real-time Event Countdown (Target: Oct 24, 2026)
  const countdown = new CountdownTimer('2026-10-24T18:00:00+02:00');
  countdown.start();

  // 3. Photo Gallery & Lightbox Modal
  const gallery = new GalleryManager();
  gallery.init();

  // 4. Animation Engine (Aurora shader, particles, tilt, scroll reveal)
  const animations = new AnimationEngine();
  animations.init();

  // 5. Scroll Navigation
  initScrollController();

  // 6. Audio Player Logic
  const audioBtn = document.getElementById('audio-player-btn');
  const bgAudio = document.getElementById('bg-audio');
  const audioLabel = document.getElementById('audio-btn-label');
  let isPlaying = false;

  const updateAudioLabel = () => {
    if (!audioLabel) return;
    const currentLang = langManager.currentLang;
    if (isPlaying) {
      audioLabel.textContent = dictionary[currentLang]['audio_active'];
    } else {
      audioLabel.textContent = dictionary[currentLang]['audio_play'];
    }
  };

  langManager.onChange(() => updateAudioLabel());

  // Royal Entrance Overlay Handler
  const entranceOverlay = document.getElementById('entrance-overlay');
  const openInvitationBtn = document.getElementById('open-invitation-btn');

  if (openInvitationBtn && entranceOverlay) {
    openInvitationBtn.addEventListener('click', () => {
      entranceOverlay.classList.add('closing');

      if (bgAudio) {
        bgAudio
          .play()
          .then(() => {
            isPlaying = true;
            if (audioBtn) audioBtn.classList.add('playing');
            updateAudioLabel();
          })
          .catch((err) => console.warn('Audio auto-play prevented:', err));
      }

      setTimeout(() => {
        entranceOverlay.style.display = 'none';
      }, 1200);
    });
  }

  if (audioBtn && bgAudio) {
    audioBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgAudio.pause();
        isPlaying = false;
        audioBtn.classList.remove('playing');
      } else {
        bgAudio
          .play()
          .then(() => {
            isPlaying = true;
            audioBtn.classList.add('playing');
          })
          .catch((err) => console.warn('Audio play blocked:', err));
      }
      updateAudioLabel();
    });
  }

  // 7. Calendar Dropdown Toggle & Export Handlers
  const calDropdownBtn = document.getElementById('cal-dropdown-btn');
  const calDropdownMenu = document.getElementById('cal-dropdown-menu');
  const googleCalBtn = document.getElementById('add-google-cal');
  const icsDownloadBtn = document.getElementById('download-ics-btn');

  if (calDropdownBtn && calDropdownMenu) {
    calDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      calDropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      calDropdownMenu.classList.remove('active');
    });
  }

  const eventData = {
    title: 'Tareq & Layla Wedding Celebration',
    description: 'Wedding celebration of Tareq Mahmoud El-Kholy & Layla Sherif Fahmy at Four Seasons Nile Plaza Cairo',
    location: 'Four Seasons Hotel Cairo at Nile Plaza',
    startDate: '2026-10-24T18:00:00+02:00',
    endDate: '2026-10-25T02:00:00+02:00',
  };

  if (googleCalBtn) {
    googleCalBtn.addEventListener('click', () => {
      window.open(generateGoogleCalendarUrl(eventData), '_blank');
    });
  }

  if (icsDownloadBtn) {
    icsDownloadBtn.addEventListener('click', () => {
      downloadIcsFile(eventData);
    });
  }

  // 8. IBAN Copy Button
  const copyBtn = document.getElementById('copy-iban-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const iban = copyBtn.getAttribute('data-iban');
      if (iban) {
        const success = await copyToClipboard(iban);
        if (success) {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = `<span>${dictionary[langManager.currentLang]['copied']}</span>`;
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2500);
        }
      }
    });
  }

  // 9. RSVP Attendance & Guest Selection
  const btnAttendingYes = document.getElementById('rsvp-btn-yes');
  const btnAttendingNo = document.getElementById('rsvp-btn-no');
  const guestGroup = document.getElementById('rsvp-guest-group');
  const guestBtns = document.querySelectorAll('.rsvp-guest-btn');

  if (btnAttendingYes && btnAttendingNo) {
    btnAttendingYes.addEventListener('click', () => {
      btnAttendingYes.classList.add('active');
      btnAttendingNo.classList.remove('active');
      if (guestGroup) guestGroup.style.display = 'flex';
    });

    btnAttendingNo.addEventListener('click', () => {
      btnAttendingNo.classList.add('active');
      btnAttendingYes.classList.remove('active');
      if (guestGroup) guestGroup.style.display = 'none';
    });
  }

  guestBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      guestBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 10. RSVP Form Submission
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');
  const rsvpResetBtn = document.getElementById('rsvp-reset-btn');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        if (rsvpForm) rsvpForm.style.display = 'none';
        if (rsvpSuccess) rsvpSuccess.style.display = 'flex';
      }, 1000);
    });
  }

  if (rsvpResetBtn) {
    rsvpResetBtn.addEventListener('click', () => {
      if (rsvpForm) {
        rsvpForm.reset();
        rsvpForm.style.display = 'flex';
        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = false;
      }
      if (rsvpSuccess) rsvpSuccess.style.display = 'none';
    });
  }
});
