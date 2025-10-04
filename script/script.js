const $ = document;
const notePad = $.getElementById("notePad");

let lastTypedLatter;

notePad.addEventListener("input", (event) => {
  lastTypedLatter = event.data;
  console.log(lastTypedLatter);
});
