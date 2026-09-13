const RANGE_SCALE_MIN = 25;
const RANGE_SCALE_MAX = 100;
const RANGE_SCALE_STEP = 25;
const RANGE_SCALE_START = 100;

const scaleControls = document.querySelector('.scale');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const effectLevelValue = document.querySelector('.effect-level__value');
const imageEffectSliderContainer = document.querySelector(
  '.img-upload__effect-level',
);
const imageEffectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const updateScale = (scale) => {
  scaleControlValue.value = `${scale}%`;
  imageUploadPreview.style.transform = `scale(${scale / 100})`;
};

const initializeImageFormScale = ({ signal }) => {
  scaleControls.addEventListener(
    'click',
    (evt) => {
      const currentScale = parseInt(scaleControlValue.value, 10);
      if (evt.target.classList.contains('scale__control--smaller')) {
        if (currentScale > RANGE_SCALE_MIN) {
          updateScale(currentScale - RANGE_SCALE_STEP);
        }
      }

      if (evt.target.classList.contains('scale__control--bigger')) {
        if (currentScale < RANGE_SCALE_MAX) {
          updateScale(currentScale + RANGE_SCALE_STEP);
        }
      }
    },
    { signal },
  );

  updateScale(RANGE_SCALE_START);
};

effectLevelValue.value = 0;

noUiSlider.create(imageEffectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

imageEffectSliderContainer.classList.add('hidden');
imageUploadPreview.style.filter = '';

imageEffectSlider.noUiSlider.on('update', () => {
  const value = imageEffectSlider.noUiSlider.get();
  const currentEffect = document.querySelector('.effects__radio:checked').value;

  effectLevelValue.value = value;

  switch (currentEffect) {
    case 'chrome':
      imageUploadPreview.style.filter = `grayscale(${value})`;
      break;

    case 'sepia':
      imageUploadPreview.style.filter = `sepia(${value})`;
      break;

    case 'marvin':
      imageUploadPreview.style.filter = `invert(${value}%)`;
      break;

    case 'phobos':
      imageUploadPreview.style.filter = `blur(${value}px)`;
      break;

    case 'heat':
      imageUploadPreview.style.filter = `brightness(${value})`;
      break;

    default:
      imageUploadPreview.style.filter = '';
  }
});

const initializeImageFormEffects = ({ signal }) => {
  effectsList.addEventListener(
    'change',
    (evt) => {
      const effect = evt.target.value;

      if (effect === 'none') {
        imageEffectSliderContainer.classList.add('hidden');
      } else {
        imageEffectSliderContainer.classList.remove('hidden');
      }

      switch (effect) {
        case 'chrome':
        case 'sepia':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          break;

        case 'marvin':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
          break;

        case 'phobos':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          break;

        case 'heat':
          imageEffectSlider.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          break;

        default:
          imageUploadPreview.style.filter = '';
          effectLevelValue.value = 0;
      }
    },
    { signal },
  );
};

const resetImageEditor = () => {
  updateScale(RANGE_SCALE_START);
  imageUploadPreview.style.filter = '';
  effectLevelValue.value = 0;
  document.querySelector('.effects__radio[value="none"]').checked = true;
  imageEffectSliderContainer.classList.add('hidden');
};

export { initializeImageFormScale, resetImageEditor, initializeImageFormEffects };
