const $ = document;
const notePad = $.getElementById("notePad");

const finishingRegex = /[ .,?!]/;

let lastTypedLetter;
let lastWord = "";

notePad.addEventListener("input", (event) => {
  lastTypedLetter = event.data;

  if (lastTypedLetter === null) {
    lastWord = lastWord.slice(0, -1);
  } else if (finishingRegex.test(lastTypedLetter)) {
    if (lastWord.length > 0) {
      console.log("Word is finished:", lastWord);
      lastWord = "";
    }
  } else {
    lastWord += lastTypedLetter;
  }

  console.log("Current lastWord:", lastWord);
});
