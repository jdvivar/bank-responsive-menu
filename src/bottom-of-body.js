import './styles.scss'
import '@fortawesome/fontawesome-free/js/all.js'
import 'animate.css/animate.min.css'

const delay = 400
const animationTime = 1000

const openMenu = () => {
  console.log('openMenu')
  const menuClosed = document.getElementById('menu--closed')
  const menuTransitioning = document.getElementById('menu--transitioning')
  const menuOpened = document.getElementById('menu--opened')

  menuClosed.classList.toggle('--hidden')
  menuTransitioning.classList.toggle('--shown')
  setTimeout(() => {
    menuOpened.classList.toggle('--shown')
  }, delay)
}

document.querySelectorAll('.js-open-menu')
  .forEach(element => element.addEventListener('click', openMenu))
  
  const closeMenu = () => {
    console.log('closeMenu')
    const menuClosed = document.getElementById('menu--closed')
    const menuTransitioning = document.getElementById('menu--transitioning')
    const menuOpened = document.getElementById('menu--opened')
    
    menuOpened.classList.toggle('--shown')
    menuTransitioning.classList.toggle('--shown')
    setTimeout(() => {
      menuClosed.classList.toggle('--hidden')
    }, animationTime)
  }

document.querySelectorAll('.js-close-menu')
  .forEach(element => element.addEventListener('click', closeMenu))
  
document.body.style.display = ''
