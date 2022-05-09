import BaseComponent from './base-component';

export default class KeyboardKey extends BaseComponent {
  constructor(keyObj, parent, opts) {
    super('div', ['keyboard__key'], `${keyObj.val}`, parent);

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
    }

    this.element.addEventListener('mousedown', () => {
      this.element.classList.add('pressed');
    });

    ['mouseup', 'mouseleave'].forEach((event) => {
      this.element.addEventListener(event, () => {
        this.element.classList.remove('pressed');
      });
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
}
