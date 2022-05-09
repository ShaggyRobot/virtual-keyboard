import BaseComponent from './base-component';

export default class KeyboardKey extends BaseComponent {
  constructor(keyObj, parent, opts) {
    super('div', ['keyboard__key'], `${opts.caps ? keyObj.shiftVal : keyObj.val}`, parent);

    this.code = keyObj.code;

    this.element.dataset.keyCode = keyObj.code;
    this.element.dataset.val = keyObj.val;
    this.element.dataset.shiftVal = keyObj.shiftVal;

    if (opts.dark) {
      this.element.classList.add('keyboard__key--dark');
    }

    if (opts.wide) {
      this.element.classList.add('keyboard__key--wide', 'keyboard__key--dark');
    }

    if (opts.indicated) {
      this.classList.add('keyboard__key--wide', 'keyboard__key--dark', 'keyboard__key--indicated');
    }

    if (opts.space) {
      this.element.classList.add('keyboard__key--extra-wide');
    }

    if (keyObj.code === 'Delete' || keyObj.code === 'Tab') {
      this.element.classList.remove('keyboard__key--wide');
    }

    if (keyObj.code === 'CapsLock') {
      this.element.classList.add('keyboard__key--indicated');

      window.addEventListener('keydown', (e) => {
        if (e.getModifierState('CapsLock')) {
          this.element.classList.add('indicate');
        } else {
          this.element.classList.remove('indicate');
        }
      });
    }

    this.element.addEventListener('mousedown', () => {
      this.element.classList.add('pressed');
    });

    this.element.addEventListener('mouseup', () => {
      this.element.classList.remove('pressed');
    });

    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.code === this.code) {
        this.element.classList.add('pressed');
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === this.code) {
        this.element.classList.remove('pressed');
      }
    });
  }

  remove() {
    this.element.remove();
  }

  // keyHandler(e) {
  //   e.preventDefault();
  //   if (e.code === this.code) {
  //     this.element.classList.add('pressed');
  //     this.element.click();
  //   }
  // }
}
