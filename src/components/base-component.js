export default class BaseComponent {
  constructor(
    tag = 'div',
    classes = ['base-component'],
    content = '',
    parentNode = null,
    attributes = {},
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...classes);
    this.element.innerHTML = content;

    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        this.element.setAttribute(key, attributes[key]);
      });
    }

    if (parentNode) {
      this.parent = parentNode;
      parentNode.append(this.element);
    }
  }
}
