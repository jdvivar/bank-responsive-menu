import './styles.scss'
import 'animate.css/animate.min.css'

import './polyfills.js'
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
let isClosed = true

// Define how opening the menu works
const openMenu = () => {
  if (isClosed) {
    isClosed = false
    const menuClosed = document.getElementById('menu__closed')
    const menuTransitioning = document.getElementById('menu__transitioning')
    const menuOpened = document.getElementById('menu__opened')
    const hamburgers = document.querySelectorAll('.hamburger')
    const backdrop = document.getElementById('backdrop')
    const nav = document.getElementById('nav')

    nav.classList.add('__opened')
    backdrop.classList.add('__shown')
    hamburgers.forEach(hamburger => hamburger.classList.add('is-active'))
    menuClosed.classList.toggle('__hidden')
    menuTransitioning.classList.toggle('__shown')
    setTimeout(() => {
      menuOpened.classList.toggle('__shown')
    }, window.isIE ? 0 : delay)
  }
}

document.querySelectorAll('.js-open-menu')
  .forEach(element => element.addEventListener('click', openMenu))

// Define how closing the menu works
const closeMenu = () => {
  if (!isClosed) {
    isClosed = true
    const menuClosed = document.getElementById('menu__closed')
    const menuTransitioning = document.getElementById('menu__transitioning')
    const menuOpened = document.getElementById('menu__opened')
    const hamburgers = document.querySelectorAll('.hamburger')
    const mainSubmenu = document.getElementById('main-submenu')
    const otherSubmenus = document.querySelectorAll('.menu-swipeable-wrapper:not(#main-submenu)')
    const backdrop = document.getElementById('backdrop')
    const nav = document.getElementById('nav')

    backdrop.classList.remove('__shown')
    hamburgers.forEach(hamburger => hamburger.classList.remove('is-active'))
    menuOpened.classList.toggle('__shown')
    menuTransitioning.classList.toggle('__shown')
    setTimeout(() => {
      menuClosed.classList.toggle('__hidden')
      mainSubmenu.classList.remove('__hidden')
      otherSubmenus.forEach(menu => menu.classList.add('__hidden'))
      nav.classList.remove('__opened')
    }, animationTime)
  }
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

  if (window.isIE) {
    setTimeout(handleAnimationEnd)
  }
}

// Define how opening/closing a sub-menu works
const toggleSubmenu = (event, action) => {
  const menuToHide = event.srcElement.closest('.menu-swipeable-wrapper')
  const menuToShow = document.getElementById(event.srcElement.dataset.submenuId)
  const hideAnimation = action === 'open' ? 'fadeOutLeft' : 'fadeOutRight'
  const showAnimation = action === 'open' ? 'fadeInRight' : 'fadeInLeft'
  const toggleHiden = element => element.classList.toggle('__hidden')

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

// Close menu when ESC key is pressed
document.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape') {
    closeMenu()
  }
})

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
