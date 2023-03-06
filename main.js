const startButton = document.querySelector('#startButton')
const endButton = document.querySelector('#endButton')
const circleButtons = document.querySelectorAll('.circle')
const scoreDisplay = document.querySelector('#scoreDisplay')
const finalScore = document.querySelector('#finalScore')
const overlay = document.querySelector('.overlay')
const message = document.querySelector('#message')
let scoreCount = 0
let number
let pace = 1000
let rounds = 0
circleButtons.forEach(button => {
  button.disabled = true
})
const clickSound = new Audio('whoosh4.mp3')
const clownSound = new Audio('clown.mp3')
const endSound = new Audio('end.mp3')
const accelSound = new Audio('accel.mp3')
const musicSound = new Audio('music.mp3') //  https://www.youtube.com/watch?v=2f81W4_bdeI&ab_channel=TheSci-FiSoundsProject-Topic
musicSound.volume = 0.1
musicSound.play()

let previousNumber
const randomNumber = (event) => {
  while (number === previousNumber) {
    number = Math.floor(Math.random() * circleButtons.length)
  }
  previousNumber = number
  pace = pace - 30
  circleClicked = false
  rounds++
  console.log(`rounds: ${rounds}`)
  if (rounds === 3) {
    endGame(event)
  }
}
let previousCircle = null

let startGame = (event) => {
  circleButtons.forEach(button => {
    button.disabled = false
  })
  musicSound.volume = 0.05
  accelSound.play()
  /* console.log('Start button is clicked') */
  event.preventDefault()
  startButton.classList.add('hide')
  endButton.classList.add('end')
  randomNumber(event)
  console.log(number)
  const newCircle = circleButtons[number]
  if (previousCircle !== null) {
    previousCircle.classList.remove('bg')
  }
  newCircle.classList.add('bg')
  previousCircle = newCircle
  setTimeout(() => {
    startGame(event)
  }, pace)
}

let circleClicked = false
const clickCircle = (i) => {
  console.log('circle index:', i)
  if (i === number && circleClicked === false) {
    scoreCount += 30
    console.log(scoreCount)
    scoreDisplay.textContent = ` ${scoreCount}km/h`
    circleClicked = true
    rounds = 0
    const volumePercent = Math.min(100, scoreCount / 2)
    const volume = volumePercent / 100
    clickSound.currentTime = 0
    clickSound.volume = volume
    clickSound.play()
    event.preventDefault()
  } else if (i === number && circleClicked === true) {
    event.preventDefault()
  } else {
    endGame(event)
  }
}

const endGame = (event) => {
  musicSound.volume = 0
  event.preventDefault()
  startGame = false
  accelSound.pause()
  overlay.classList.toggle('visible')
  const modal = document.querySelector('.modal')
  modal.style.display = 'block'
  if (scoreCount === 0) {
    finalScore.textContent = 'LOL'
  } else {
    finalScore.textContent = `Your speed was ${scoreCount}km/h before crashing`
  }
  if (scoreCount === 0) {
    clownSound.play()
    message.textContent = 'You crashed on the first one \uD83E\uDD21 \uD83E\uDD21 \uD83E\uDD21 \uD83E\uDD21 \uD83E\uDD21'
  } else if (scoreCount < 150) {
    endSound.play()
    message.textContent = 'YOU SUCK xdd A novice should hanlde at least 150km/h'
  } else if (scoreCount < 300) {
    endSound.play()
    message.textContent = 'Not bad! With practice you can reach 300km/h'
  } else if (scoreCount < 500) {
    endSound.play()
    message.textContent = 'Very good! Elite pilots can reach 500km/h, can you?'
  } else {
    endSound.play()
    message.textContent = 'Over 500km/h! Elite level piloting skills!'
  }
}
/* startButton.addEventListener('click', startGame) */
startButton.addEventListener('click', (event) => {
  startGame(event)
})
endButton.addEventListener('click', (event) => {
  endGame(event)
})
circleButtons.forEach((circle, i) => {
  circle.addEventListener('click', () =>
    clickCircle(i))
})
