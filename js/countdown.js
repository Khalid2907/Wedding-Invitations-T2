/* ============================================================
   AURORA LUXURY INVITATION — Real-Time Countdown (countdown.js)
   ============================================================ */

export class CountdownTimer {
  constructor(targetDateIso) {
    this.targetDate = new Date(targetDateIso).getTime();
    this.timerId = null;
  }

  start() {
    this.update();
    this.timerId = setInterval(() => this.update(), 1000);
  }

  stop() {
    if (this.timerId) clearInterval(this.timerId);
  }

  update() {
    const now = new Date().getTime();
    const diff = this.targetDate - now;

    if (diff <= 0) {
      this.render(0, 0, 0, 0);
      this.stop();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.render(days, hours, minutes, seconds);
  }

  render(days, hours, minutes, seconds) {
    const elDays = document.getElementById('count-days');
    const elHours = document.getElementById('count-hours');
    const elMins = document.getElementById('count-mins');
    const elSecs = document.getElementById('count-secs');

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMins) elMins.textContent = String(minutes).padStart(2, '0');
    if (elSecs) elSecs.textContent = String(seconds).padStart(2, '0');
  }
}
