import { disableEl } from "./moduls/stylesElement";

const bg = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick(e) {
  // console.log('Start');
  timerId = setInterval(() => colorChange(getRandomHexColor()), 1000)
  disableEl.disableElementList(btnStart, btnStop)
}
function onBtnStopClick(e) {
  // console.log('Stop');
  clearInterval(timerId);
  disableEl.disableElementList(btnStop, btnStart)
}

function colorChange(color) {
  bg.style.backgroundColor = color;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
