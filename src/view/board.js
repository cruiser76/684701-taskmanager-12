import {createElement} from './../utils.js';

const createBoardContainerTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardContainerTemplate();
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

export default Board;

