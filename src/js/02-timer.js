import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const startBtn = document.querySelector("[data-start]");
const timer = document.querySelector(".timer");
const dataInput = document.querySelector("#datetime-picker");

const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dataInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addZero = (value) => value.toString().padStart(2, "0");

startBtn.addEventListener("click", () => {
  const timerId = setInterval(() => {
    const timeDown = new Date(dataInput.value) - new Date();
    startBtn.disabled = true;
    // startBtn.disabled.style.color = "red";

    if (timeDown >= 0) {
      let time = convertMs(timeDown);
      days.textContent = addZero(time.days);
      hours.textContent = addZero(time.hours);
      minutes.textContent = addZero(time.minutes);
      seconds.textContent = addZero(time.seconds);
      if (timeDown <= 10000) {
        timer.style.color = "red";
      }
    } else {
      Notiflix.Notify.success("Countdown finished");
      timer.style.color = "green";
      clearInterval(timerId);
    }
  }, 1000);
});
