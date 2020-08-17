import {createMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createBoardContainerTemplate} from './view/board.js';
import {createTaskTemplate} from './view/task.js';
import {createEditTaskTemplate} from './view/task-edit.js';
import {createLoadMoreTemplate} from './view/load-more.js';
import {generateFilter} from './mock/filter.js';

import getTask from './mock/task.js';

const TASK_COUNT_PER_STEP = 8;
const TASK_COUNT = 22;

const tasks = Array(TASK_COUNT).fill().map(() => getTask());
const filters = generateFilter(tasks);

const renderComponent = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

renderComponent(mainControl, createMenuTemplate(), `beforeend`);
renderComponent(main, createFilterTemplate(filters), `beforeend`);
renderComponent(main, createBoardContainerTemplate(), `beforeend`);

const boardContainer = main.querySelector(`.board.container`);
renderComponent(boardContainer, createSortTemplate(), `afterbegin`);

const boardList = boardContainer.querySelector(`.board__tasks`);
renderComponent(boardList, createEditTaskTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderComponent(boardList, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  renderComponent(boardList, createLoadMoreTemplate(), `beforeend`);

  const loadMoreButton = boardList.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderComponent(loadMoreButton, createTaskTemplate(task), `beforeBegin`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
