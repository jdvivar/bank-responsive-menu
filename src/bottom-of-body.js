import './styles.scss'
import 'animate.css/animate.min.css'

import {
  library as iconsLibrary,
  dom as iconsDom,
  config as iconsConfig
} from '@fortawesome/fontawesome-svg-core'
import {
  faMapMarkerAlt,
  faComments,
  faHeart,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons'

const delay = 400
const animationTime = 1000

// Define how opening the menu works
const openMenu = () => {
  const menuClosed = document.getElementById('menu--closed')
  const menuTransitioning = document.getElementById('menu--transitioning')
  const menuOpened = document.getElementById('menu--opened')
  const hamburgers = document.querySelectorAll('.hamburger')

  hamburgers.forEach(hamburger => hamburger.classList.add('is-active'))
  menuClosed.classList.toggle('--hidden')
  menuTransitioning.classList.toggle('--shown')
  setTimeout(() => {
    menuOpened.classList.toggle('--shown')
  }, delay)
}

document.querySelectorAll('.js-open-menu')
  .forEach(element => element.addEventListener('click', openMenu))

// Define how closing the menu works
const closeMenu = () => {
  const menuClosed = document.getElementById('menu--closed')
  const menuTransitioning = document.getElementById('menu--transitioning')
  const menuOpened = document.getElementById('menu--opened')
  const hamburgers = document.querySelectorAll('.hamburger')
  const mainSubmenu = document.getElementById('main-submenu')
  const otherSubmenus = document.querySelectorAll('.menu-swipeable-wrapper:not(#main-submenu)')

  hamburgers.forEach(hamburger => hamburger.classList.remove('is-active'))
  menuOpened.classList.toggle('--shown')
  menuTransitioning.classList.toggle('--shown')
  setTimeout(() => {
    menuClosed.classList.toggle('--hidden')
    mainSubmenu.classList.remove('--hidden')
    otherSubmenus.forEach(menu => menu.classList.add('--hidden'))
  }, animationTime)
}

document.querySelectorAll('.js-close-menu')
  .forEach(element => element.addEventListener('click', closeMenu))

// Function to animate stuff
// Improved version from the example at
// https://github.com/daneden/animate.css
const animateCSS = (element, animationName, callback) => {
  element.classList.add('animated', animationName)

  const handleAnimationEnd = () => {
    element.classList.remove('animated', animationName)
    element.removeEventListener('animationend', handleAnimationEnd)

    if (typeof callback === 'function') callback(element)
  }

  element.addEventListener('animationend', handleAnimationEnd)
}

// Define how opening/closing a sub-menu works
const toggleSubmenu = (event, action) => {
  const menuToHide = event.srcElement.closest('.menu-swipeable-wrapper')
  const menuToShow = document.getElementById(event.srcElement.dataset.submenuId)
  const hideAnimation = action === 'open' ? 'fadeOutLeft' : 'fadeOutRight'
  const showAnimation = action === 'open' ? 'fadeInRight' : 'fadeInLeft'
  const toggleHiden = element => element.classList.toggle('--hidden')

  toggleHiden(menuToShow)
  animateCSS(menuToHide, hideAnimation, toggleHiden)
  animateCSS(menuToShow, showAnimation)
}

const openSubmenu = event => toggleSubmenu(event, 'open')
const closeSubmenu = event => toggleSubmenu(event, 'close')

document.querySelectorAll('.js-open-submenu')
  .forEach(element => element.addEventListener('click', openSubmenu))

document.querySelectorAll('.js-close-submenu')
  .forEach(element => element.addEventListener('click', closeSubmenu))

// Icons
iconsConfig.autoReplaceSvg = 'nest'
iconsLibrary.add(faMapMarkerAlt)
iconsLibrary.add(faComments)
iconsLibrary.add(faHeart)
iconsLibrary.add(faCreditCard)
iconsDom.watch()

// LAST STATEMENT
// Hiding everything until this script is loaded
document.body.style.display = ''
