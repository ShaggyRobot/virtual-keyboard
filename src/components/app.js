import BaseComponent from './base-component';

import ru from '../key-arrs/ru';
import en from '../key-arrs/en';
import Keyboard from './keyboard';

const wrapper = new BaseComponent('div', ['wrapper'], '', document.body).element;
const title = new BaseComponent('h1', ['title'], 'Virtual keyboard', wrapper);
const subtitle = new BaseComponent('p', ['subtitle'], 'Rolling Scopes School JSFE2022Q1', wrapper);
const textArea = new BaseComponent('textarea', ['textarea'], '', wrapper, {
  rows: 16,
  cols: 64
});

const langObj = {
  ru,
  en
};

const keyboard = new Keyboard(textArea.element, wrapper, { en, ru });

// txtarea.value = `${txtarea.value.slice(0, position - 1)}${txtarea.value.slice(position)}`;
// txtarea.dataset.position = txtarea.dataset.position > 0 ? +txtarea.dataset.position - 1 : 0;
