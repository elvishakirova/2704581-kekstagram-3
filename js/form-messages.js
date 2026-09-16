const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const showDataError = () => {
  const alertContainer = dataErrorTemplate
    .content
    .querySelector('.data-error')
    .cloneNode(true);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

let controller;

const showSuccessMessage = () => {
  controller = new AbortController();
  const { signal } = controller;

  const successMessage = successTemplate
    .content
    .querySelector('.success')
    .cloneNode(true);
  document.body.append(successMessage);

  const successButton = successMessage.querySelector('.success__button');
  const successMessageContainer = successMessage.querySelector('.success__inner');

  const closeSuccessMessage = () => {
    successMessage.remove();
    controller.abort();
  };

  successButton.addEventListener('click', closeSuccessMessage, { signal });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  },
  { signal },
  );

  document.addEventListener('click', (evt) => {
    if (!successMessageContainer.contains(evt.target)) {
      closeSuccessMessage();
    }
  },
  { signal },
  );
};

const showErrorMessage = () => {
  controller = new AbortController();
  const { signal } = controller;

  const errorMessage = errorTemplate
    .content
    .querySelector('.error')
    .cloneNode(true);
  document.body.append(errorMessage);

  const errorButton = errorMessage.querySelector('.error__button');
  const errorMessageContainer = errorMessage.querySelector('.error__inner');

  const closeErrorMessage = () => {
    errorMessage.remove();
    controller.abort();
  };

  errorButton.addEventListener('click', closeErrorMessage, { signal });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  },
  { signal },
  );

  document.addEventListener('click', (evt) => {
    if (!errorMessageContainer.contains(evt.target)) {
      closeErrorMessage();
    }
  },
  { signal },
  );
};

export { showDataError, showSuccessMessage, showErrorMessage };
