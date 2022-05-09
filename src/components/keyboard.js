/* eslint-disable no-unused-vars */
import BaseComponent from './base-component';
import KeyboardKey from './keyboard-key';
import { getLang, setLang } from '../utils/local-storage';
import keypressHandler from '../utils/keypress-handler';

export default class Keyboard extends BaseComponent {
  constructor(textarea, parent, langObj) {
    super('div', ['keyboard'], '', parent);
    this.textarea = textarea;
    this.langObj = langObj;
    this.downKeys = new Set();
    this.capsOn = false;
    this.altShiftHandler();
    this.render();

    window.addEventListener('keydown', (e) => {
      const txt = this.textarea;
      const key = document.querySelector(`[data-key-code=${e.code}]`);
      if (key) {
        keypressHandler(key, txt, this.downKeys);
      }
    });

    this.element.addEventListener('mousedown', (e) => {
      if (e.target.dataset.keyCode) {
        const key = e.target;
        const txt = this.textarea;
        keypressHandler(key, txt, this.downKeys);
      }
    });
  }

  render() {
    this.capsOn = false;
    const keyArr = this.langObj[getLang()];
    this.element.innerHTML = '';
    window.addEventListener('mousedown', () => {
      this.textarea.focus();
    });
    window.addEventListener('mouseup', () => {
      this.textarea.focus();
    });
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
          }
          break;

        case 'Tab':
        case 'ShiftLeft':
        case 'CapsLock':
          {
            const keyNode = new KeyboardKey(key, this.element, { wide: true });
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
          }

          break;

        case 'Space':
          {
            const keyNode = new KeyboardKey(key, this.element, { space: true });
          }
          break;

        default:
          {
            const keyNode = new KeyboardKey(key, this.element, { caps: this.capsOn });
          }
          break;
      }
    });
  }

  altShiftHandler() {
    const switchChord = ['AltLeft', 'ShiftLeft'];
    document.addEventListener('keydown', (e) => {
      const allKeys = [...document.querySelectorAll('.keyboard__key')].filter(
        (el) => el.dataset.shiftVal !== 'null',
      );
      const letters = allKeys.filter((el) => el.dataset.val === el.dataset.shiftVal.toLowerCase());
      const nonLetters = allKeys.filter(
        (el) => el.dataset.val !== el.dataset.shiftVal.toLowerCase(),
      );

      this.downKeys.add(e.code);

      if (e.code === 'CapsLock') {
        this.capsOn = !this.capsOn;
        document.querySelector('[data-key-code=CapsLock').classList.toggle('indicate');
        if (this.capsOn) {
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        } else {
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.val;
          });
        }
      }

      if (this.downKeys.has('ShiftLeft') || this.downKeys.has('ShiftRight')) {
        if (this.capsOn) {
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.val;
          });

          nonLetters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        } else {
          allKeys.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        }
      }

      if (switchChord.every((code) => this.downKeys.has(code))) {
        if (getLang() === 'en') {
          setLang('ru');
          this.render();
        } else {
          setLang('en');
          this.render();
        }
      }
    });

    this.element.addEventListener('mousedown', (e) => {
      const allKeys = [...document.querySelectorAll('.keyboard__key')].filter(
        (el) => el.dataset.shiftVal !== 'null',
      );
      const letters = allKeys.filter((el) => el.dataset.val === el.dataset.shiftVal.toLowerCase());
      const nonLetters = allKeys.filter(
        (el) => el.dataset.val !== el.dataset.shiftVal.toLowerCase(),
      );

      if (e.target.dataset.keyCode) {
        this.downKeys.add(e.target.dataset.keyCode);
      }

      if (e.target.dataset.keyCode === 'CapsLock') {
        this.capsOn = !this.capsOn;
        document.querySelector('[data-key-code=CapsLock').classList.toggle('indicate');
        if (this.capsOn) {
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        } else {
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.val;
          });
        }
      }

      if (this.downKeys.has('ShiftLeft') || this.downKeys.has('ShiftRight')) {
        if (this.capsOn) {
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.val;
          });

          nonLetters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        } else {
          allKeys.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        }
      }

      if (switchChord.every((code) => this.downKeys.has(code))) {
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
      const allKeys = [...document.querySelectorAll('.keyboard__key')].filter(
        (el) => el.dataset.shiftVal !== 'null',
      );
      const letters = allKeys.filter((el) => el.dataset.val === el.dataset.shiftVal.toLowerCase());
      const nonLetters = allKeys.filter(
        (el) => el.dataset.val !== el.dataset.shiftVal.toLowerCase(),
      );
      this.downKeys.delete(e.code);
      if (this.capsOn) {
        if (!this.downKeys.has('ShiftLeft') && !this.downKeys.has('ShiftRight')) {
          nonLetters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.val;
          });
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        }
      } else if (!this.downKeys.has('ShiftLeft') && !this.downKeys.has('ShiftRight')) {
        allKeys.forEach((elem) => {
          const individualKey = elem;
          individualKey.innerHTML = individualKey.dataset.val;
        });
      }
    });

    document.addEventListener('mouseup', (e) => {
      const allKeys = [...document.querySelectorAll('.keyboard__key')].filter(
        (el) => el.dataset.shiftVal !== 'null',
      );
      const letters = allKeys.filter((el) => el.dataset.val === el.dataset.shiftVal.toLowerCase());
      const nonLetters = allKeys.filter(
        (el) => el.dataset.val !== el.dataset.shiftVal.toLowerCase(),
      );

      this.downKeys.clear();
      if (this.capsOn) {
        if (!this.downKeys.has('ShiftLeft') && !this.downKeys.has('ShiftRight')) {
          nonLetters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.val;
          });
          letters.forEach((elem) => {
            const individualKey = elem;
            individualKey.innerHTML = individualKey.dataset.shiftVal;
          });
        }
      } else if (!this.downKeys.has('ShiftLeft') && !this.downKeys.has('ShiftRight')) {
        allKeys.forEach((elem) => {
          const individualKey = elem;
          individualKey.innerHTML = individualKey.dataset.val;
        });
      }
    });
  }
}
