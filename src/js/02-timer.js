// Описаний в документації
import flatpickr from "../../node_modules/flatpickr/dist/typings.d.ts";
import Notiflix from '../../node_modules/notiflix/index.d.ts';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { disableEl } from "./moduls/stylesElement";
import dateWork from "./moduls/dateWork";


const startBtn = document.querySelector('button[data-start]');
const myDatetimePicker = document.querySelector('#datetime-picker');

const daysLabel = document.querySelector('.timer>.field>.value[data-days]');
const hoursLabel = document.querySelector('.timer>.field>.value[data-hours]');
const minutesLabel = document.querySelector('.timer>.field>.value[data-minutes]');
const secondsLabel = document.querySelector('.timer>.field>.value[data-seconds]');


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
    const {days, hours, minutes, seconds} = dateWork.convertMsToObj(finalDate - thisDate)

    daysLabel.textContent = days;
    hoursLabel.textContent = hours;
    minutesLabel.textContent = minutes;
    secondsLabel.textContent = seconds;
  }
}