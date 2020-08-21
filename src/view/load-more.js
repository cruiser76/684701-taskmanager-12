import Abstract from './abstract.js';

const createLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMore extends Abstract {
  getTemplate() {
    return createLoadMoreTemplate();
  }
}

export default LoadMore;
