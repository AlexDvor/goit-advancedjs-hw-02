const refs = {
  boxForm: document.querySelector('.feedback-form'),
  formSubBtn: document.querySelector('.feedback-submit-btn'),
};

const FORM_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const saveDataToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getDataFromLS = key => {
  const res = localStorage.getItem(key);
  return JSON.parse(res);
};

const removeDataFromLS = key => {
  localStorage.removeItem(key);
};

const getFormData = () => {
  const dataForm = getDataFromLS(FORM_KEY);

  if (!dataForm) {
    return;
  }

  formData = { ...dataForm };

  for (let key in formData) {
    refs.boxForm.elements[key].value = formData[key];
  }
};

const onInputForm = ev => {
  const fieldname = ev.target.name;
  const fieldVal = ev.target.value;

  formData[fieldname] = fieldVal;

  try {
    saveDataToLS(FORM_KEY, formData);
  } catch (error) {
    console.log('🚀 ~ error:', error);
  }
};

const removeMsByPlaceholder = () => {
  for (const key in formData) {
    refs.boxForm.elements[key].placeholder = ``;
  }
};

const onSubmitBtn = ev => {
  ev.preventDefault();

  for (const key in formData) {
    if (formData[key] === '') {
      refs.boxForm.elements[key].placeholder = `Fill please all fields`;
      return;
    }
  }

  console.log(formData);
  refs.boxForm.reset();
  removeMsByPlaceholder();
  formData = { email: '', message: '' };
  removeDataFromLS(FORM_KEY);
};

getFormData();

refs.boxForm.addEventListener('input', onInputForm);
refs.formSubBtn.addEventListener('click', onSubmitBtn);
