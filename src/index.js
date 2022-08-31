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
