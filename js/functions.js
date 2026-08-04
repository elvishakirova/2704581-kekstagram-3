const checkStringLength = (string, number) => string.length <= number;

function isPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    newString += normalizedString[i];
  }

  return newString === normalizedString;
}


function extractingInteger (parameter) {
  let positiveString = '';
  const normalizedParameter = parameter.toString();

  for (let i = 0; i < normalizedParameter.length; i++) {
    const parsedChar = parseInt(normalizedParameter[i], 10);
    if (!isNaN(parsedChar)) {
      positiveString += normalizedParameter[i];
    }
  }

  const positiveInteger = parseInt(positiveString, 10);
  if (isNaN(positiveInteger)) {
    return NaN;
  } else {
    return positiveInteger;
  }
}
