

export default function Slider({ numSlides, sliderElement, btnSliderPrev, btnSliderNext }) {
  this.indexSlides = 0;
  this.numSlides = numSlides;
  this.slider = sliderElement;
  this.btnSliderPrev = btnSliderPrev;
  this.btnSliderNext = btnSliderNext;
}

Slider.prototype = {
  constructor: Slider,

  init() {
    this.btnSliderNext.addEventListener('click', () => {
      this.indexSlides += 1;
      this.handlerSlider();
    });

    this.btnSliderPrev.addEventListener('click', () => {
      this.indexSlides -= 1;
      this.handlerSlider();
    });
  },

  initThumbnails({ containerThumbnail, thumbnailItem }) {
    this.thumbnailWrapper = containerThumbnail;
    this.previousThumbnail = thumbnailItem;

    // Thumbnails preview
    this.thumbnailWrapper.addEventListener('click', (e) => this.handlerThumbnail(e))
  },

  handlerSlider() {
    if (this.indexSlides < 0) this.indexSlides = this.numSlides - 1;
    if (this.indexSlides > this.numSlides - 1) this.indexSlides = 0;
    this.slider.style.transform = `translate(-${100 * this.indexSlides}%)`;
  },

  handlerThumbnail(e) {
    const classThumbnailItem = this.previousThumbnail.classList[0];
    if (!e.target.classList.contains(classThumbnailItem)) return;

    this.indexSlides = e.target.dataset.thumbIndex;
    this.previousThumbnail?.classList.remove('active');
    e.target.classList.add('active');
    this.previousThumbnail = e.target;
    this.handlerSlider();
  }

}
