import Abstract from './abstract.js';

const createBoardContainerTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

class Board extends Abstract {
  getTemplate() {
    return createBoardContainerTemplate();
  }
}

export default Board;


