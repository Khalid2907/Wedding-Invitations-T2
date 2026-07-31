/* ============================================================
   AURORA LUXURY INVITATION — Gallery & Lightbox (gallery.js)
   ============================================================ */

export class GalleryManager {
  constructor() {
    this.modal = document.getElementById('lightbox-modal');
    this.modalImg = document.getElementById('lightbox-img');
    this.modalCaption = document.getElementById('lightbox-caption');
    this.currentIndex = 0;
    this.photos = [];
  }

  init() {
    this.bindTabs();
    this.bindLightbox();
  }

  bindTabs() {
    const tabBtns = document.querySelectorAll('.gallery-tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');

        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach((item) => {
          const itemCat = item.getAttribute('data-category');
          if (cat === 'all' || itemCat === cat) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  bindLightbox() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    this.photos = Array.from(galleryCards).map((card) => ({
      url: card.getAttribute('data-img'),
      caption: card.getAttribute('data-caption') || '',
    }));

    galleryCards.forEach((card, index) => {
      card.addEventListener('click', () => this.openLightbox(index));
    });

    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevPhoto());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPhoto());

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!this.modal || !this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevPhoto();
      if (e.key === 'ArrowRight') this.nextPhoto();
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightbox();
    if (this.modal) this.modal.classList.add('active');
  }

  closeLightbox() {
    if (this.modal) this.modal.classList.remove('active');
  }

  prevPhoto() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateLightbox();
  }

  nextPhoto() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateLightbox();
  }

  updateLightbox() {
    const photo = this.photos[this.currentIndex];
    if (this.modalImg && photo) this.modalImg.src = photo.url;
    if (this.modalCaption && photo) this.modalCaption.textContent = photo.caption;
  }
}
