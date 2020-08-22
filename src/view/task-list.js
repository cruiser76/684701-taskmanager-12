import Abstract from './abstract.js';

const createTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

class TaskList extends Abstract {
  getTemplate() {
    return createTaskListTemplate();
  }
}

export default TaskList;
