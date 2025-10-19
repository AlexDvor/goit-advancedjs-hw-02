import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
const refs = {
  inputPicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  valueDays: document.querySelector('.value[data-days]'),
  valueHours: document.querySelector('.value[data-hours]'),
  valueMinutes: document.querySelector('.value[data-minutes]'),
  valueSeconds: document.querySelector('.value[data-seconds]'),
};

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};

const convertMs = ms => {
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
};

const checkDate = selectDate => {
  const diff = selectDate - Date.now();

  if (diff <= 0) {
    refs.startBtn.disabled = true;

    iziToast.show({
      backgroundColor: '#fe5044',
      message: 'Please choose a date in the future',
      messageColor: 'white',
      position: 'topRight',
    });

    return;
  }

  userSelectedDate = selectDate;
  refs.startBtn.disabled = false;
};

const onBtnClick = ev => {
  if (!userSelectedDate) {
    return;
  }
  refs.startBtn.disabled = true;
  refs.inputPicker.disabled = true;

  const intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      userSelectedDate = '';
      refs.startBtn.disabled = false;
      refs.inputPicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    const { valueDays, valueHours, valueMinutes, valueSeconds } = refs;

    valueDays.textContent = addLeadingZero(days);
    valueHours.textContent = addLeadingZero(hours);
    valueMinutes.textContent = addLeadingZero(minutes);
    valueSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
};

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

refs.startBtn.disabled = true;
flatpickr(refs.inputPicker, options);
refs.startBtn.addEventListener('click', onBtnClick);
