import flatpickr from 'flatpickr';

const refs = {
  inputPicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  valueDays: document.querySelector('.value[data-days]'),
  valueHours: document.querySelector('.value[data-hours]'),
  valueMinutes: document.querySelector('.value[data-minutes]'),
  valueSeconds: document.querySelector('.value[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};

let userSelectedDate = '';

flatpickr(refs.inputPicker, options);

const checkDate = selectDate => {
  const diff = selectDate - Date.now();
  if (diff <= 0) {
    console.log('Please choose a date in the future');
    return;
  }

  userSelectedDate = selectDate;
};

const onBtnClick = ev => {
  if (!userSelectedDate) {
    return;
  }

  setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diff);
    const { valueDays, valueHours, valueMinutes, valueSeconds } = refs;

    valueDays.textContent = String(days).padStart(2, '0');
    valueHours.textContent = String(hours).padStart(2, '0');
    valueMinutes.textContent = String(minutes).padStart(2, '0');
    valueSeconds.textContent = String(seconds).padStart(2, '0');
  }, 1000);
};

refs.startBtn.addEventListener('click', onBtnClick);

function convertMs(ms) {
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
