import { resetImageEditor } from './image-editor.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_COUNT = 5;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const closeButton = imageUploadForm.querySelector('.img-upload__cancel');

const commentField = imageUploadForm.querySelector('.text__description');

const hashtagField = imageUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
});

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentField,
  validateComment,
  `Комментарий не может быть длиннее ${COMMENT_MAX_LENGTH} символов`,
);

const getHashtags = (value) => {
  const hashtags = value.split(/\s+/).filter((hashtag) => hashtag !== '');

  const normalizedHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(normalizedHashtags);

  return { hashtags, normalizedHashtags, uniqueHashtags };
};

const validateHashtagsFormat = (value) => {
  const hashtagPattern = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const { hashtags } = getHashtags(value);

  for (const hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const validateHasgtagsCount = (value) => {
  const { uniqueHashtags } = getHashtags(value);

  if (uniqueHashtags.size > HASHTAG_MAX_COUNT) {
    return false;
  }

  return true;
};

const validateHashtagsDoubleness = (value) => {
  const { normalizedHashtags, uniqueHashtags } = getHashtags(value);

  if (normalizedHashtags.length !== uniqueHashtags.size) {
    return false;
  }

  return true;
};

pristine.addValidator(
  hashtagField,
  validateHashtagsFormat,
  'Хэштег должен начинаться с символа #, содержать только буквы и цифры, и быть не длиннее 20 символов',
  10,
);

pristine.addValidator(
  hashtagField,
  validateHasgtagsCount,
  `Хэштегов не может быть больше ${HASHTAG_MAX_COUNT}`,
  5,
);

pristine.addValidator(
  hashtagField,
  validateHashtagsDoubleness,
  'Хэштеги не должны повторяться',
  1,
);

let controller;

const closeImageUploadForm = () => {
  imageEditOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadForm.reset();
  pristine.reset();
  resetImageEditor();
  controller.abort();
};

const openImageUploadForm = () => {
  controller = new AbortController();
  const { signal } = controller;

  imageEditOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closeImageUploadForm, { signal });

  imageUploadForm.addEventListener(
    'submit',
    (evt) => {
      const isValid = pristine.validate();
      if (!isValid) {
        evt.preventDefault();
      }
    },
    { signal },
  );

  document.addEventListener(
    'keydown',
    (evt) => {
      if (
        document.activeElement !== commentField &&
        document.activeElement !== hashtagField &&
        evt.key === 'Escape'
      ) {
        closeImageUploadForm();
      }
    },
    { signal },
  );
};

imageUploadInput.addEventListener('change', openImageUploadForm);
