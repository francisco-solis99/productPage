import './styles/styles.scss';
import Slider from './js/Slider.js';
import ShoppingCart from './js/ShoppingCart.js';

// Menu btns
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
const slider = new Slider({
  numSlides: document.querySelectorAll('.slider__item').length,
  sliderElement: document.querySelector('.slider__container'),
  btnSliderPrev: document.querySelector('.slider__control--prev'),
  btnSliderNext: document.querySelector('.slider__control--next'),
});

slider.init();
slider.initThumbnails({
  containerThumbnail: document.querySelector('.slider__thubmbails'),
  thumbnailItem: document.querySelector('.slider__thumb-item')
});

// Cart shopping
const myShoppingCart = new ShoppingCart({
  btnCart: document.querySelector('.nav__btn--cart'),
  shoppingCart: document.querySelector('.cart__shopping'),
  cartItemsContainer: document.querySelector('.cart__items'),
  btnAddToCart: document.querySelector('#btn-add-to-cart'),
  itemsCartElement: document.querySelector('.cart__num-products'),
  timesElement: document.querySelector('#product-num-items'),
  btnShoppingCartPlus: document.querySelector('#btn-plus'),
  btnShoppingCartMinus: document.querySelector('#btn-minus'),
});

myShoppingCart.init();
