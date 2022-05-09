import BaseComponent from './base-component';
import KeyboardKey from './keyboard-key';
import { getLang, setLang } from '../utils/local-storage';

export default class Keyboard extends BaseComponent {
  constructor(textarea, parent, langObj) {
    super('div', ['keyboard'], '', parent);
    this.textarea = textarea;
    this.langObj = langObj;
    this.downKeys = new Set();
    this.ks = [];
    this.altShiftHandler();
    this.render();
    this.capsOn = false;
    window.addEventListener('keydown', (e) => {
      const txt = this.textarea;
      const key = document.querySelector(`[data-key-code=${e.code}]`);
      if (key) {
        switch (key.dataset.keyCode) {
          case 'Tab':
            {
              const start = txt.selectionStart;
              txt.value = `${txt.value.slice(0, txt.selectionStart)}    ${txt.value.slice(
                txt.selectionEnd
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
                  txt.selectionEnd
                )}`;
                txt.selectionStart = start - 1;
                txt.selectionEnd = start - 1;
              } else {
                txt.value = `${txt.value.slice(0, txt.selectionStart)}${txt.value.slice(
                  txt.selectionEnd
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

          default:
            if (key.dataset.shiftVal !== 'null') {
              const start = txt.selectionStart;

              txt.value = `${txt.value.slice(0, txt.selectionStart)}${
                key.innerHTML
              }${txt.value.slice(txt.selectionEnd)}`;

              txt.selectionStart = start + 1;
              txt.selectionEnd = start + 1;
            }
            break;
        }
      }
    });
  }

  render() {
    const keyArr = this.langObj[getLang()];
    this.element.innerHTML = '';
    this.ks.forEach((key) => {
      key.remove();
    });
    window.onkeydown = null;
    window.addEventListener('keydown', () => {
      this.textarea.focus();
    });

    keyArr.forEach((key) => {
      switch (key.code) {
        case 'Backspace':
        case 'Enter':
        case 'ShiftRight':
        case 'Delete':
          {
            const keyNode = new KeyboardKey(key, this.element, { wide: true });
            const lineBrk = new BaseComponent('br', [], '', this.element);

            keyNode.element.addEventListener('mousedown', () => {
              this.downKeys.add(key.code);
            });
            keyNode.element.addEventListener('mouseup', () => {
              this.downKeys.delete(key.code);
            });

            this.ks.push(keyNode);
          }
          break;

        case 'Tab':
        case 'ShiftLeft':
        case 'CapsLock':
          {
            const keyNode = new KeyboardKey(key, this.element, { wide: true });
            keyNode.element.addEventListener('mousedown', () => {
              this.downKeys.add(key.code);
            });
            keyNode.element.addEventListener('mouseup', () => {
              this.downKeys.delete(key.code);
            });

            this.ks.push(keyNode);
          }
          break;
        case 'ControlLeft':
        case 'ControlRight':
        case 'MetaLeft':
        case 'AltLeft':
        case 'AltRight':
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
          {
            const keyNode = new KeyboardKey(key, this.element, { dark: true });

            keyNode.element.addEventListener('mousedown', () => {
              this.downKeys.add(key.code);
            });
            keyNode.element.addEventListener('mouseup', () => {
              this.downKeys.delete(key.code);
            });

            this.ks.push(keyNode);
          }

          break;

        case 'Space':
          {
            const keyNode = new KeyboardKey(key, this.element, { space: true });

            this.ks.push(keyNode);
          }
          break;

        default:
          {
            const keyNode = new KeyboardKey(key, this.element, { caps: this.capsOn });

            keyNode.element.addEventListener('click', () => {
              this.textarea.focus();
              this.textarea.value += key.val;
            });

            // window.addEventListener('keydown', (e) => {
            //   if (e.code === key.code) {
            //     console.log(keyNode);
            //     this.textarea.value += key.val;
            //   }
            // });

            this.ks.push(keyNode);
          }
          break;
      }
    });

    // handlePress(){

    // }
  }

  altShiftHandler() {
    const switchChord = ['AltLeft', 'ShiftLeft'];
    document.addEventListener('keydown', (e) => {
      const allKeys = document.querySelectorAll('.keyboard__key');
      this.downKeys.add(e.code);

      if (this.downKeys.has('ShiftLeft') || this.downKeys.has('ShiftReft')) {
        allKeys.forEach((elem) => {
          if (elem.dataset.shiftVal !== 'null') {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          }
        });
      }

      if (switchChord.every((code) => this.downKeys.has(code))) {
        // this.downKeys.clear();

        if (getLang() === 'en') {
          setLang('ru');
          this.render();
        } else {
          setLang('en');
          this.render();
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      const allKeys = document.querySelectorAll('.keyboard__key');
      this.downKeys.delete(e.code);
      if (!this.downKeys.has('ShiftLeft') && !this.downKeys.has('ShiftRight')) {
        allKeys.forEach((elem) => {
          if (elem.dataset.shiftVal !== 'null') {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.val;
          }
        });
      }
    });
  }
}
