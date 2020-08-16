import {createMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createBoardContainerTemplate} from './view/board.js';
import {createTaskTemplate} from './view/task.js';
import {createEditTaskTemplate} from './view/task-edit.js';
import {createLoadMoreTemplate} from './view/load-more.js';

import getTask from './mock/task.js';

const tasks = Array(3).fill().map(() => getTask());
console.log(tasks);

const renderComponent = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

renderComponent(mainControl, createMenuTemplate(), `beforeend`);
renderComponent(main, createFilterTemplate(), `beforeend`);
renderComponent(main, createBoardContainerTemplate(), `beforeend`);

const boardContainer = main.querySelector(`.board.container`);

renderComponent(boardContainer, createSortTemplate(), `afterbegin`);
renderComponent(boardContainer, createLoadMoreTemplate(), `beforeend`);

const boardList = boardContainer.querySelector(`.board__tasks`);
renderComponent(boardList, createEditTaskTemplate(), `beforeend`);
renderComponent(boardList, createTaskTemplate(), `beforeend`);
renderComponent(boardList, createTaskTemplate(), `beforeend`);
renderComponent(boardList, createTaskTemplate(), `beforeend`);
