import {RenderPosition} from './const.js';
import Abstract from './../view/abstract.js';

export const createElement = (template) => {
  const elementWrapper = document.createElement(`div`);
  elementWrapper.innerHTML = template;

  return elementWrapper.firstChild;
};

export const renderComponent = (container, template, position) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(position, template);
};

export const render = (container, element, position) => {

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFORE:
      container.before(element);
      break;
    case RenderPosition.AFTER:
      container.after(element);
      break;
  }
};
