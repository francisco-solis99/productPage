import './styles/styles.scss';


const btnOpenMenu = document.querySelector('.nav__btn--open');
const btnCloseMenu = document.querySelector('.nav__btn--close');
const overlay = document.querySelector('.overlay');


const menu = document.querySelector('.nav__list--primary');

btnOpenMenu.addEventListener('click', toggleMenu);
btnCloseMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}

// Slider
let indexSlides = 0;
const [btnSliderPrev, btnSliderNext] = document.querySelectorAll('.slider__control')
const slider = document.querySelector('.slider__container');
const numSlides = document.querySelectorAll('.slider__item').length;
const thumbnailWrapper = document.querySelector('.slider__thubmbails');


btnSliderNext.addEventListener('click', () => {
  indexSlides += 1;
  handlerSlider();
});

btnSliderPrev.addEventListener('click', () => {
  indexSlides -= 1;
  handlerSlider();
});


function handlerSlider() {
  if (indexSlides < 0) indexSlides = numSlides - 1;
  if (indexSlides > numSlides - 1) indexSlides = 0;
  slider.style.transform = `translate(-${100 * indexSlides}%)`;
}


// Thumbnails preview
thumbnailWrapper.addEventListener('click', (e) => handlerThumbnail(e))
let previousThumbnail = document.querySelector('.slider__thumb-item');
function handlerThumbnail(e) {
  if (!e.target.classList.contains('slider__thumb-item')) return;

  indexSlides = e.target.dataset.thumbIndex;
  previousThumbnail?.classList.remove('active');
  e.target.classList.add('active');
  previousThumbnail = e.target;
  handlerSlider();
}
