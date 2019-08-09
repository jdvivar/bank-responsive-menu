import './styles.scss'
import '@fortawesome/fontawesome-free/js/all.js'

const delay = 400
const animationTime = 1000

window.openMenu = () => {
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

window.closeMenu = () => {
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

document.body.style.display = ''
