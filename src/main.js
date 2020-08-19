import SiteMenu from './view/site-menu.js';
import Filter from './view/filter.js';
import SortTemplate from './view/sort.js';
import Board from './view/board.js';
import TaskList from './view/task-list.js';
import Task from './view/task.js';
import TaskEdit from './view/task-edit.js';
import LoadMore from './view/load-more.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

import getTask from './mock/task.js';

const TASK_COUNT_PER_STEP = 8;
const TASK_COUNT = 22;

const tasks = Array(TASK_COUNT).fill().map(() => getTask());
const filters = generateFilter(tasks);

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(main, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

const board = new Board();
render(main, board.getElement(), RenderPosition.BEFOREEND);

render(board.getElement(), new SortTemplate().getElement(), RenderPosition.AFTERBEGIN);

const taskList = new TaskList();
render(board.getElement(), taskList.getElement(), RenderPosition.BEFOREEND);
render(taskList.getElement(), new TaskEdit(tasks[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskList.getElement(), new Task(tasks[i]).getElement(), RenderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMore = new LoadMore();

  render(taskList.getElement(), loadMore.getElement(), RenderPosition.BEFOREEND);

  loadMore.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(loadMore.getElement(), new Task(task).getElement(), RenderPosition.BEFORE));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMore.getElement().remove();
      loadMore.removeElement();
    }
  });
}
