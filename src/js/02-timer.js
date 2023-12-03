// Описаний в документації
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { disableEl } from "./moduls/stylesElement";

const startBtn = document.querySelector('button[data-start]');
const myDatetimePicker = document.querySelector('#datetime-picker');

const daysLabel = document.querySelector('.value[data-days]');
const hoursLabel = document.querySelector('.value[data-hours]');
const minutesLabel = document.querySelector('.value[data-minutes]');
const secondsLabel = document.querySelector('.value[data-seconds]');


let finalDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(new Date(selectedDates[0]) > new Date()){
      finalDate = new Date(selectedDates[0])
      disableEl.disableElement(startBtn, false)
    } else {
      // window.alert("Please choose a date in the future")
      Notiflix.Notify.warning('Please choose a date in the future');
      disableEl.disableElement(startBtn)
    }
  },
};
flatpickr(myDatetimePicker, options);

startBtn.addEventListener('click', onStartBtnClick)

function onStartBtnClick(e) {
  console.log("press stare");  
  const timerId = setInterval(() => {
    const thisDate = new Date;

    if (finalDate < thisDate) {
      clearInterval(timerId)
      disableEl.disableElement(startBtn)
    } else {
      updateTimer(finalDate, thisDate); 
    }       
  }, 1000);
}

function updateTimer(finalDate, thisDate) {
  if(finalDate >= thisDate){
    const {days, hours, minutes, seconds} = convertMsToObj(finalDate - thisDate)

    daysLabel.textContent = days;
    hoursLabel.textContent = hours;
    minutesLabel.textContent = minutes;
    secondsLabel.textContent = seconds;
  }
}

function convertMsToObj(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}