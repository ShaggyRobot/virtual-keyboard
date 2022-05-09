/* eslint-disable no-unused-vars */
import BaseComponent from './base-component';

import ru from '../key-arrs/ru';
import en from '../key-arrs/en';
import Keyboard from './keyboard';

const langObj = {
  ru,
  en,
};

const wrapper = new BaseComponent('div', ['wrapper'], '', document.body).element;
const title = new BaseComponent('h1', ['title'], 'Virtual keyboard', wrapper);
const subtitle = new BaseComponent('p', ['subtitle'], 'Rolling Scopes School JSFE2022Q1', wrapper);
const textArea = new BaseComponent('textarea', ['textarea'], '', wrapper, {
  rows: 8,
  cols: 64,
});
const subtitle2 = new BaseComponent('p', ['subtitle'], 'Keyboard was created in MS Windows. To switch layout, use left Alt + Shift.', wrapper);
const keyboard = new Keyboard(textArea.element, wrapper, { en, ru });
