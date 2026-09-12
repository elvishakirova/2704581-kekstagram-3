const RANGE_SCALE_MIN = 25;
const RANGE_SCALE_MAX = 100;
const RANGE_SCALE_STEP = 25;
const RANGE_SCALE_START = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const effectLevelValue = document.querySelector('.effect-level__value');
const imageEffectSliderContainer = document.querySelector('.img-upload__effect-level');
const imageEffectSlider = document.querySelector('.effect-level__slider');
const effectRadioButton = document.querySelectorAll('.effects__radio');

const updateScale = (scale) => {
  scaleControlValue.value = `${scale}%`;
  imageUploadPreview.style.transform = `scale(${scale / 100})`;
};

const makeUpdateScale = () => {
  scaleControlSmaller.addEventListener('click', () => {
    const currentScale = parseInt(scaleControlValue.value, 10);

    if (currentScale > RANGE_SCALE_MIN) {
      updateScale(currentScale - RANGE_SCALE_STEP);
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    const currentScale = parseInt(scaleControlValue.value, 10);

    if (currentScale < RANGE_SCALE_MAX) {
      updateScale(currentScale + RANGE_SCALE_STEP);
    }
  });
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

  if (currentEffect === 'chrome') {
    imageUploadPreview.style.filter = `grayscale(${value})`;
  } else if (currentEffect === 'sepia') {
    imageUploadPreview.style.filter = `sepia(${value})`;
  } else if (currentEffect === 'marvin') {
    imageUploadPreview.style.filter = `invert(${value}%)`;
  } else if (currentEffect === 'phobos') {
    imageUploadPreview.style.filter = `blur(${value}px)`;
  } else if (currentEffect === 'heat') {
    imageUploadPreview.style.filter = `brightness(${value})`;
  } else {
    imageUploadPreview.style.filter = '';
  }
});

effectRadioButton.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    if (!evt.target.checked) {
      return;
    }

    const effect = evt.target.value;

    if (effect === 'chrome' || effect === 'sepia') {
      imageEffectSliderContainer.classList.remove('hidden');
      imageEffectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (effect === 'marvin') {
      imageEffectSliderContainer.classList.remove('hidden');
      imageEffectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if (effect === 'phobos') {
      imageEffectSliderContainer.classList.remove('hidden');
      imageEffectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (effect === 'heat') {
      imageEffectSliderContainer.classList.remove('hidden');
      imageEffectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (effect === 'none') {
      imageEffectSliderContainer.classList.add('hidden');
      imageUploadPreview.style.filter = '';
      effectLevelValue.value = 0;
    }
  });
});

const resetImageEditor = () => {
  updateScale(RANGE_SCALE_START);
  imageUploadPreview.style.filter = '';
  effectLevelValue.value = 0;
  document.querySelector('.effects__radio[value="none"]').checked = true;
  imageEffectSliderContainer.classList.add('hidden');
};

export { makeUpdateScale, resetImageEditor };
