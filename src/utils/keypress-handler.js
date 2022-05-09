export default function keypressHandler(key, field) {
  const txt = field;
  switch (key.dataset.keyCode) {
    case 'Tab':
      {
        const start = txt.selectionStart;
        txt.value = `${txt.value.slice(0, txt.selectionStart)}    ${txt.value.slice(
          txt.selectionEnd,
        )}`;

        txt.selectionStart = start + 4;
        txt.selectionEnd = start + 4;
      }
      break;

    case 'Backspace':
      {
        const start = txt.selectionStart;
        const end = txt.selectionEnd;
        if (start === end) {
          if (start === 0) break;
          txt.value = `${txt.value.slice(0, txt.selectionStart - 1)}${txt.value.slice(
            txt.selectionEnd,
          )}`;
          txt.selectionStart = start - 1;
          txt.selectionEnd = start - 1;
        } else {
          txt.value = `${txt.value.slice(0, txt.selectionStart)}${txt.value.slice(
            txt.selectionEnd,
          )}`;
          txt.selectionStart = start;
          txt.selectionEnd = start;
        }
      }
      break;

    case 'Delete':
      {
        const start = txt.selectionStart;
        const end = txt.selectionEnd;
        if (start === end) {
          txt.value = `${txt.value.slice(0, txt.selectionStart)}${txt.value.slice(
            txt.selectionStart + 1,
          )}`;
          txt.selectionStart = start;
          txt.selectionEnd = start;
        } else {
          txt.value = `${txt.value.slice(0, txt.selectionStart)}${txt.value.slice(
            txt.selectionEnd,
          )}`;
          txt.selectionStart = start;
          txt.selectionEnd = start;
        }
      }
      break;

    case 'ArrowLeft':
      if (txt.selectionStart === 0) {
        txt.selectionEnd = txt.selectionStart;
        break;
      }

      txt.selectionStart -= 1;
      txt.selectionEnd = txt.selectionStart;
      break;

    case 'ArrowRight':
      txt.selectionStart += 1;
      txt.selectionEnd = txt.selectionStart;
      break;

    case 'Space':
      {
        const start = txt.selectionStart;

        txt.value = `${txt.value.slice(0, txt.selectionStart)} ${txt.value.slice(
          txt.selectionEnd,
        )}`;

        txt.selectionStart = start + 1;
        txt.selectionEnd = start + 1;
      }
      break;

    case 'Enter':
      {
        const start = txt.selectionStart;

        txt.value = `${txt.value.slice(0, txt.selectionStart)}\n${txt.value.slice(
          txt.selectionEnd,
        )}`;

        txt.selectionStart = start + 1;
        txt.selectionEnd = start + 1;
      }
      break;

    default:
      if (key.dataset.shiftVal !== 'null') {
        const start = txt.selectionStart;

        txt.value = `${txt.value.slice(0, txt.selectionStart)}${key.innerText}${txt.value.slice(
          txt.selectionEnd,
        )}`;

        txt.selectionStart = start + 1;
        txt.selectionEnd = start + 1;
      }
      break;
  }
}
