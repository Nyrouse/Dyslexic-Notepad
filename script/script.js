const $ = document;
const notePad = $.getElementById("notePad");

const finishingRegex = /[ .,?!]/;

let lastTypedLetter = "";
let lastWord = "";
let scrambledWord = "";

function scrambleLetters(word) {
  if (word.length <= 3) return word;

  const chars = word.split("");
  const middle = chars.slice(1, -1);

  for (let i = middle.length - 1; i > 0; i--) {
    if (Math.random() < 0.3) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }
  }

  return chars[0] + middle.join("") + chars[chars.length - 1];
}

notePad.addEventListener("input", (event) => {
  lastTypedLetter = event.data;

  if (lastTypedLetter === null) {
  } else if (finishingRegex.test(lastTypedLetter) || lastTypedLetter === " ") {
    if (lastWord.length > 0) {
      console.log("Word is finished:", scrambleLetters(lastWord));
      lastWord = "";
    }
  } else {
    lastWord += lastTypedLetter;
  }

  if (lastWord.length > 0) {
    scrambledWord = scrambleLetters(lastWord);
  }

  const text = notePad.value;
  console.log(text.split(" "));
});
