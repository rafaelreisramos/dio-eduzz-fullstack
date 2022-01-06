let gameSequence = []
let playerSequence = []
let score = 0

const colors = ['green', 'red', 'yellow', 'blue']

const green = document.querySelector('.green')
const red = document.querySelector('.red')
const yellow = document.querySelector('.yellow')
const blue = document.querySelector('.blue')

const elements = {
  'green': green,
  'red': red,
  'yellow': yellow,
  'blue': blue
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const click = (color) => {
  playerSequence[playerSequence.length] = color 
  const element = elements[color]
  element.classList.add('selected')

  setTimeout(() => {
    element.classList.remove('selected')
  }, 250)
 
  checkPlayerSequence()
}

green.addEventListener('click', () => click('green'))
red.addEventListener('click', () => click('red'))
yellow.addEventListener('click', () => click('yellow'))
blue.addEventListener('click', () => click('blue'))

const generateSequence = async () => {
  const color = colors[Math.floor(Math.random() * colors.length)]
  gameSequence[gameSequence.length] = color;

  for(let i in gameSequence) {
    const element = elements[gameSequence[i]]
    element.classList.add('selected')
    
    await sleep(500)
    
    element.classList.remove('selected')
    
    await sleep(500)
  }
  console.log(gameSequence)
}

const checkPlayerSequence = async () => {
  for (let i in playerSequence) {
    if (playerSequence[i] != gameSequence[i]) {
      gameOver()
      break
    }
  }
  
  score++

  if (playerSequence.length > 0 && playerSequence.length == gameSequence.length) {
    await sleep(300)
    playerSequence = []
    alert(`Congratulations!\nYour score: ${score}\n\nPress OK for next level.`)
    
    generateSequence()
  }
}

const gameOver = () => {
  gameSequence = []
  playerSequence = []
  alert(`You lost!\nYour score: ${score}.\n\nPress OK for a new game.`)

  score = 0

  generateSequence()
}

const startGame = () => {
  alert(`Welcome to Genius\n\nPress OK to start a new game.`)
  score = 0

  generateSequence()
}

startGame()
