// function to check if the given string contains no alphabets
function hasnotAlphabet(string) {
  keyboardSymbols = [
    "`",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "{",
    "]",
    "}",
    "\\",
    "|",
    ";",
    ":",
    "'",
    '"',
    ",",
    "<",
    ".",
    ">",
    "/",
    "?",
  ];
  const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // loop through the keyboard symbols and numbers array
  for (let i = 0; i < keyboardSymbols.length; i++) {
    // if the string contains any of the symbols or numbers, return true
    if (
      string.includes(keyboardSymbols[i]) ||
      string.includes(numbersArray[i])
    ) {
      return true;
    }
  }
  // if no symbol or number is found, return false
  return false;
}

// function to check if the given string contains any invalid characters for an address
function checkAddress(string) {
  keyboardSymbols = [
    "`",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "/",
    "_",
    "=",
    "+",
    "[",
    "{",
    "]",
    "}",
    "\\",
    "|",
    ";",
    "'",
    '"',
    "<",
    ".",
    ">",
    "?",
  ];

  // loop through the keyboard symbols
  for (let i = 0; i < keyboardSymbols.length; i++) {
    // if the string contains any of the symbols, return true
    if (string.includes(keyboardSymbols[i])) {
      return true;
    }
  }
  // if no symbol is found, return false
  return false;
}

// function to check if the given value contains a number
function hasNumber(value) {
  const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // loop through the numbers array
  for (let i = 0; i < numbersArray.length; i++) {
    // if the value contains any of the numbers, return true
    if (value.includes(numbersArray[i])) {
      return true;
    }
  }
  // if no number is found, return false
  return false;
}

// function to check if the given string contains any uppercase alphabet
function hasAlp(e) {
  const alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // loop through the uppercase alphabets
  for (let i = 0; i < alp.length; i++) {
    // if the string contains any of the uppercase alphabets, return true
    if (e.includes(alp[i])) {
      return true;
    }
  }
  // if no uppercase alphabet is found, return false
  return false;
}
