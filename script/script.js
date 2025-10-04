function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

window.addEventListener("load", () => {
  const hasReadHowTo = getCookie("readHowToUse");

  if (!hasReadHowTo) {
    window.location.href = "./howToUse.html";
  } else {
    console.log("User has already read the How To Use page.");
  }
});

const notePad = document.getElementById("notePad");
const finishingRegex = /[ \.,!?;:]/;

let currentWord = "";
let wordStartIndex = 0;

let scrambleRate = 0.3;
let scrambleDelay = 2000;

let pendingWords = [];

function scrambleWord(word) {
  if (word.length <= 3) return word;
  const first = word[0];
  const last = word[word.length - 1];
  let middle = word.slice(1, -1).split("");

  if (middle.length > 1) {
    let i = Math.floor(Math.random() * middle.length);
    let j;
    do {
      j = Math.floor(Math.random() * middle.length);
    } while (i === j);
    [middle[i], middle[j]] = [middle[j], middle[i]];
  }

  const vowels = "aeiou";
  if (Math.random() < 0.3) {
    for (let k = 0; k < middle.length; k++) {
      if (vowels.includes(middle[k].toLowerCase())) {
        middle[k] = vowels[Math.floor(Math.random() * vowels.length)];
        break;
      }
    }
  }

  return first + middle.join("") + last;
}

notePad.addEventListener("input", (event) => {
  const typed = event.data;
  if (!typed) return;

  const cursorPos = notePad.selectionStart;

  if (finishingRegex.test(typed)) {
    if (currentWord.length > 3 && Math.random() < scrambleRate) {
      pendingWords.push({
        value: currentWord,
        start: wordStartIndex,
      });

      setTimeout(() => {
        const val = notePad.value;
        pendingWords.forEach((wordObj) => {
          const { value, start } = wordObj;
          if (val.slice(start, start + value.length) === value) {
            const scrambled = scrambleWord(value);
            notePad.value =
              val.slice(0, start) + scrambled + val.slice(start + value.length);
          }
        });
        pendingWords = [];
      }, scrambleDelay);
    }
    currentWord = "";
  } else {
    if (currentWord.length === 0) {
      wordStartIndex = notePad.selectionStart - 1;
    }
    currentWord += typed;
  }
});
