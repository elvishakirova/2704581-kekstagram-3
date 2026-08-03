function checkStringLength (string, number) {
  const length = string.length;
  return (length < number) ? true : (length === number) ? true : (length > number) ? false : false;
}


function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString[i];
  }

  return newString === normalizedString ? true : false;
}


function extractingInteger (parameter) {
  let positiveString = '';
  const normalizedParameter = parameter.toString();

  for (let i = 0; i < normalizedParameter.length; i++) {
    const parsedChar = parseInt(normalizedParameter[i]);
    if (!isNaN(parsedChar)) {
      positiveString += normalizedParameter[i];
    }
  }

  const positiveInteger = parseInt(positiveString);
  if (isNaN(positiveInteger)) {
    return NaN;
  } else {
    return positiveInteger;
  }
}
