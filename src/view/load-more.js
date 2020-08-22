import Abstract from './abstract.js';

const createLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMore extends Abstract {
  constructor() {
    super();
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }
  getTemplate() {
    return createLoadMoreTemplate();
  }

  _handleLoadMoreButtonClick(evt) {
    evt.preventDefault();
    this._callback.loadMoreClick();
  }

  setLoadMoreClick(cb) {
    this._callback.loadMoreClick = cb;
    this._element.addEventListener(`click`, this._handleLoadMoreButtonClick);
  }
}

export default LoadMore;
