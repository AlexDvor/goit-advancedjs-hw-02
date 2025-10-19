import iziToast from 'izitoast';

const refs = {
  form: document.querySelector('form'),
};

const onSubmitBtn = event => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const delay = formData.get('delay');
  const state = formData.get('state');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  form.reset();

  promise
    .then(res => {
      iziToast.show({
        backgroundColor: '#22b647ff',
        message: res,
        messageColor: 'white',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        backgroundColor: '#b4443cff',
        message: error,
        messageColor: 'white',
        position: 'topRight',
      });
    });
};

refs.form.addEventListener('submit', onSubmitBtn);
