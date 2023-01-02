const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const $mainMenu = document.querySelector('.main__menu')
const $game = document.querySelector('.game')
const $count = document.querySelector('.count__span')
const $healthCount = document.querySelector('.heart__span')
const $win = document.querySelector('.win')
const $lose = document.querySelector('.lose')

const $audio = new Audio(src = 'assets/audio/game_audio.mp3');
const $audioWin = new Audio(src = 'assets/audio/game_win.mp3');
const $audioLose = new Audio(src = 'assets/audio/game_over.mp3');
const $audioPiu = new Audio(src = 'assets/audio/piu.mp3');
const $audioOn = document.querySelector('.on')
const $audioOff = document.querySelector('.off')

const imgPlayer = new Image()
const imgBottle = new Image()
imgBottle.src = 'assets/img/bottle.png'
  
let xPlayer = 300
let xImage = 0
let yImage = [180, 168]
let xBottle = randomInteger(1, 13) * 50
let yBottle = 0
let speedFell = 5
let healthCount = 3
let count = 0
let win = false
let lose = false
let soundCheck = true

let flagBottleY = true

$count.insertAdjacentHTML('beforeend', ` ${count}`);
$healthCount.insertAdjacentHTML('beforeend', `${healthCount}`)

document.addEventListener('keydown', e => movePlayer(e))

function choosePlayer(player = 'vadim') {
  $mainMenu.classList.add('disabled')
  $mainMenu.classList.remove('active')
  $game.classList.add('active')
  $game.classList.remove('disabled')

  audioPlay()

  imgPlayer.src = `assets/img/players/${player}.png`

  requestAnimationFrame(render)
}

function randomInteger(min, max) {
  rand = (min + Math.random() * (max - min));
  return Math.round(rand);
}

function renderBottle() {
  yBottle = yBottle + speedFell
  if (yBottle > canvas.height) {
    yBottle = 0
    xBottle = randomInteger(1, 13) * 50;
  }
  ctx.drawImage(imgBottle, xBottle, yBottle, 50, 50);
}

function render() {
  flagBottleY = true

  checkWin()
  checkLose()

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  renderBottle()
  ctx.drawImage(imgPlayer, xImage, yImage[0], 120, yImage[1], xPlayer, 350, 50, 100)

  gameEnd()
  if (win === false && lose === false) requestAnimationFrame(render)
}

function audioPlay() {
    $audio.volume = 0.02;
    $audioWin.volume = 0.02;
    $audioLose.volume = 0.15;
    $audioPiu.volume = 0.04
    $audio.loop = 'loop';
    $audio.play();
}

function soundAdjustment() {
  if (soundCheck === true) {
      $audio.pause()
      soundCheck = false
      $audioPiu.volume = 0
  }
  else {
      $audio.play()
      soundCheck = true
      $audioPiu.volume = 0.04
  }
  $audioOn.classList.toggle('active')
  $audioOff.classList.toggle('active')
}

function movePlayer(e) {
  if (e.key === 'd' || e.key === 'в' || e.key === 'ArrowRight') {
    xImage > 480 ? xImage = 0 : xImage += 120
    xPlayer > 640 ? xPlayer = 650 : xPlayer += 10
    yImage[0] = 180
    yImage[1] = 168
  } else if (e.key === 'a' || e.key === 'ф' || e.key === 'ArrowLeft') {
    xImage < 120 ? xImage = 600 : xImage -= 120
    xPlayer < 10 ? xPlayer = 0 : xPlayer -= 10
    yImage[0] = 5
    yImage[1] = 172
  }
}

function checkWin() {
  let cheackWin = 0
  if (Math.round(yBottle) >= 350 && Math.round(yBottle) < 439) {
    cheackWin = xPlayer - xBottle
    if (cheackWin >= -25 && cheackWin <= 25) {
      if (flagBottleY === true) {
        speedFell += 0.1
        flagBottleY = false
        yBottle = 450
        $audioPiu.play()
        count++
        $count.innerHTML = ''
        $count.insertAdjacentHTML('beforeend', ` ${count}`)
        cheackWin = 0
        if (count > 9) {
          win = true
          $audio.pause()
          $audioWin.play()
        }
      }
    }
  }
}

function checkLose() {
  if (Math.round(yBottle) > 438 && Math.round(yBottle) <= 451) {
    if (flagBottleY === true) {
      flagBottleY = false
      healthCount--
      yBottle = 450
      $healthCount.innerHTML = ''
      $healthCount.insertAdjacentHTML('beforeend', ` ${healthCount}`);
      if (healthCount < 0) {
        lose = true
        $audio.pause()
        $audioLose.play()
      }
    }
  }
}

function gameEnd() {
  if (win === true) {
    $game.classList.add('disabled')
    $game.classList.remove('active')
    $win.classList.add('active')
    $win.classList.remove('disabled')
  }
  if (lose === true) {
    $game.classList.add('disabled')
    $game.classList.remove('active')
    $lose.classList.add('active')
    $lose.classList.remove('disabled')
  }
}