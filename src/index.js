import './styles/styles.scss';
import removeIcon from './assets/images/icon-delete.svg';

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

// Cart shopping view
const btnCart = document.querySelector('.nav__btn--cart');
const shoppingCart = document.querySelector('.cart__shopping');

btnCart.addEventListener('click', toggleCartShopping);

function toggleCartShopping() {
  shoppingCart.classList.toggle('active');
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



// Cart shopping
const shoppingCartProducts = [];
const cartItemsContainer = document.querySelector('.cart__items');
const btnAddToCart = document.querySelector('#btn-add-to-cart');
const itemsCartElement = document.querySelector('.cart__num-products');
btnAddToCart.addEventListener('click', handlerAddToCart);


const timesElement = document.querySelector('#product-num-items');
let numTimes = Number(timesElement.textContent);


// Control cart shoping
const btnShoppingCartPlus = document.querySelector('#btn-plus');
const btnShoppingCartMinus = document.querySelector('#btn-minus');

btnShoppingCartMinus.addEventListener('click', () => {
  if (numTimes - 1 <= 0) return;
  numTimes -= 1;
  timesElement.textContent = numTimes;
});
btnShoppingCartPlus.addEventListener('click', () => {
  numTimes += 1;
  timesElement.textContent = numTimes;
});



function handlerAddToCart() {
  // Static product object

  const product = {
    id: crypto.randomUUID(),
    name: 'Fall Limited Edition Sneakers',
    price: 125.00,
    image: import('./assets/images/image-product-1-thumbnail.jpg')
  }

  shoppingCartProducts.push(product);
  itemsCartElement.classList.add('active');
  itemsCartElement.textContent = shoppingCartProducts.length;
  renderProductIntoCart(product, numTimes);
}

function renderProductIntoCart(product, times = 1) {
  if (!cartItemsContainer.classList.contains('no-empty')) {
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.classList.add('no-empty');
    const btnCheckout = document.createElement('button');
    btnCheckout.classList.add('btn', 'btn__primary');
    btnCheckout.textContent = 'Checkout';
    shoppingCart.appendChild(btnCheckout);
  }

  const cartItemHtml = createItemCart(product, times);
  cartItemsContainer.appendChild(cartItemHtml);

}




function createItemCart(product, times) {

  const productHtml = document.createElement('div');
  productHtml.classList.add('cart__item');
  productHtml.dataset.idProduct = product.id;

  const imgProduct = document.createElement('img');
  product.image.then(response => imgProduct.src = response.default);

  const productInfo = document.createElement('div');
  productInfo.classList.add('cart__item-info');
  productInfo.innerHTML = /*html*/`
          <p>${product.name}</p>
          <p>$${product.price} x ${times} <strong>$${product.price * times}</strong></p>
  `;

  const btnToDelete = document.createElement('button');
  btnToDelete.classList.add('cart__btn-delete');
  const deleteIcon = document.createElement('img');
  deleteIcon.src = removeIcon;
  btnToDelete.appendChild(deleteIcon);
  btnToDelete.addEventListener('click', removeProductFromCart)

  productHtml.append(imgProduct, productInfo, btnToDelete);
  return productHtml;
}

function removeProductFromCart() {
  const cartItem = this.parentElement;
  const indexCartItem = shoppingCartProducts.findIndex(item => item.id === cartItem.dataset.idProduct);
  cartItem.remove();
  shoppingCartProducts.splice(indexCartItem, 1);
  itemsCartElement.textContent = shoppingCartProducts.length;
  if (!shoppingCartProducts.length) renderDeaultMessageCart();
}

function renderDeaultMessageCart() {
  shoppingCart.querySelector('button').remove();
  const defaultMessage = document.createElement('p');
  defaultMessage.textContent = 'Your car is empty';
  cartItemsContainer.classList.remove('no-empty');
  itemsCartElement.classList.remove('active');
  cartItemsContainer.append(defaultMessage);
}
