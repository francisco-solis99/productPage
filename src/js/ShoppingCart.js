
import removeIcon from '../assets/images/icon-delete.svg';

export default function ShoppingCart({
  btnCart,
  shoppingCart,
  cartItemsContainer,
  btnAddToCart,
  itemsCartElement,
  timesElement,

  // Buttons
  btnShoppingCartPlus,
  btnShoppingCartMinus,
}) {
  this.shoppingCartProducts = [];
  this.btnCart = btnCart;
  this.shoppingCart = shoppingCart;
  this.cartItemsContainer = cartItemsContainer;
  this.btnAddToCart = btnAddToCart;
  this.itemsCartElement = itemsCartElement;
  this.timesElement = timesElement;
  this.numTimes = Number(timesElement.textContent);

  this.btnShoppingCartPlus = btnShoppingCartPlus;
  this.btnShoppingCartMinus = btnShoppingCartMinus;
}

ShoppingCart.prototype = {
  constructor: ShoppingCart,
  init() {
    this.btnCart.addEventListener('click', () => this.toggleCartShopping());
    this.btnAddToCart.addEventListener('click', () => this.handlerAddToCart());
    this.btnShoppingCartMinus.addEventListener('click', () => {
      if (this.numTimes - 1 <= 0) return;
      this.numTimes -= 1;
      this.timesElement.textContent = this.numTimes;
    });
    this.btnShoppingCartPlus.addEventListener('click', () => {
      this.numTimes += 1;
      this.timesElement.textContent = this.numTimes;
    });
  },

  toggleCartShopping() {
    this.shoppingCart.classList.toggle('active');
  },

  handlerAddToCart() {
    // Static product object
    const product = {
      id: crypto.randomUUID(),
      name: 'Fall Limited Edition Sneakers',
      price: 125.00,
      image: import('../assets/images/image-product-1-thumbnail.jpg')
    }

    this.shoppingCartProducts.push(product);
    this.itemsCartElement.classList.add('active');
    this.itemsCartElement.textContent = this.shoppingCartProducts.length;
    this.renderProductIntoCart(product, this.numTimes);
  },

  renderProductIntoCart(product, times = 1) {
    if (!this.cartItemsContainer.classList.contains('no-empty')) {
      this.cartItemsContainer.innerHTML = '';
      this.cartItemsContainer.classList.add('no-empty');
      const btnCheckout = document.createElement('button');
      btnCheckout.classList.add('btn', 'btn__primary');
      btnCheckout.textContent = 'Checkout';
      this.shoppingCart.appendChild(btnCheckout);
    }

    const cartItemHtml = this.createItemCart(product, times);
    this.cartItemsContainer.appendChild(cartItemHtml);
  },

  createItemCart(product, times) {

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
    btnToDelete.addEventListener('click', (e) => this.removeProductFromCart(e))

    productHtml.append(imgProduct, productInfo, btnToDelete);
    return productHtml;
  },

  removeProductFromCart(e) {
    const cartItem = e.currentTarget.parentElement;
    const indexCartItem = this.shoppingCartProducts.findIndex(item => item.id === cartItem.dataset.idProduct);
    cartItem.remove();
    this.shoppingCartProducts.splice(indexCartItem, 1);
    this.itemsCartElement.textContent = this.shoppingCartProducts.length;
    if (!this.shoppingCartProducts.length) this.renderDeaultMessageCart();
  },

  renderDeaultMessageCart() {
    this.shoppingCart.querySelector('button').remove();
    const defaultMessage = document.createElement('p');
    defaultMessage.textContent = 'Your car is empty';
    this.cartItemsContainer.classList.remove('no-empty');
    this.itemsCartElement.classList.remove('active');
    this.cartItemsContainer.append(defaultMessage);
  }

}
