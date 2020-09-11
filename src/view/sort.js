import Abstract from './abstract.js';
import {SortType} from './../utils/const.js';

const createSortTemplate = (currentSortType) => {
  return (
    `<div class="board__filter-list">
    <a href="#" class="board__filter ${currentSortType === SortType.DEFAULT ? `board__filter--active` : ``}" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
    <a href="#" class="board__filter ${currentSortType === SortType.DATE_UP ? `board__filter--active` : ``}" data-sort-type="${SortType.DATE_UP}">SORT BY DATE up</a>
    <a href="#" class="board__filter ${currentSortType === SortType.DATE_DOWN ? `board__filter--active` : ``}" data-sort-type="${SortType.DATE_DOWN}">SORT BY DATE down</a>
    </div>`
  );
};

class Sort extends Abstract {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
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
    return createSortTemplate(this._currentSortType);
  }

  setSortTypeChangeHandler(cb) {
    this._callback.sortTypeChange = cb;
    this.getElement().addEventListener(`click`, this._handleSortTypeChange);
  }
}

export default Sort;
