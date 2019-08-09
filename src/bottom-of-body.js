import './styles.scss'
import 'animate.css/animate.min.css'

import {
  library as iconsLibrary,
  dom as iconsDom,
  config as iconsConfig
} from '@fortawesome/fontawesome-svg-core'
import { faMapMarkerAlt, faComments } from '@fortawesome/free-solid-svg-icons'

const delay = 400
const animationTime = 1000

// Define how opening the menu works
const openMenu = element => {
  console.log('open ' + element)
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
const closeMenu = element => {
  console.log('close ' + element)
  const menuClosed = document.getElementById('menu--closed')
  const menuTransitioning = document.getElementById('menu--transitioning')
  const menuOpened = document.getElementById('menu--opened')
  const hamburgers = document.querySelectorAll('.hamburger')

  hamburgers.forEach(hamburger => hamburger.classList.remove('is-active'))
  menuOpened.classList.toggle('--shown')
  menuTransitioning.classList.toggle('--shown')
  setTimeout(() => {
    menuClosed.classList.toggle('--hidden')
  }, animationTime)
}

document.querySelectorAll('.js-close-menu')
  .forEach(element => element.addEventListener('click', closeMenu))

// Icons
iconsConfig.autoReplaceSvg = 'nest'
iconsLibrary.add(faMapMarkerAlt)
iconsLibrary.add(faComments)
iconsDom.watch()

// LAST STATEMENT
// Hiding everything until JS is loaded
document.body.style.display = ''
