import {createElement} from './../utils.js';

const createLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default LoadMore;