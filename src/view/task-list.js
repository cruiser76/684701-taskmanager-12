import Abstract from '../../../taskmanager-12/src/view/abstract';

const createTaskListTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

class TaskList extends Abstract {
  getTemplate() {
    return createTaskListTemplate();
  }
}

export default TaskList;
