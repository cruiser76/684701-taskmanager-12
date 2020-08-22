import Abstract from './abstract.js';
import {SortType} from './../utils/const.js';

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
    </div>`
  );
};

class Sort extends Abstract {
  constructor() {
    super();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  _handleSortTypeChange(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(cb) {
    this._callback.sortTypeChange = cb;
    this.getElement().addEventListener(`click`, this._handleSortTypeChange);
  }
}

export default Sort;
