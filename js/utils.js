const DEBOUNCE_DELAY = 500;

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...callbackArguments) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, callbackArguments), timeoutDelay);
  };
};

export { debounce };
