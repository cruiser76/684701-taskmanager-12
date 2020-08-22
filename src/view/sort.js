import Abstract from './abstract.js';

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

class SortTemplate extends Abstract {
  getTemplate() {
    return createSortTemplate();
  }
}

export default SortTemplate;
