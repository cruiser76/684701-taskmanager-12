import SiteMenu from './view/site-menu.js';
import Filter from './view/filter.js';
import SortTemplate from './view/sort.js';
import Board from './view/board.js';
import TaskList from './view/task-list.js';
import Task from './view/task.js';
import TaskEdit from './view/task-edit.js';
import LoadMore from './view/load-more.js';
import NoTask from './view/no-task.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';
import {RenderPosition} from './utils/const.js';

import getTask from './mock/task.js';

const TASK_COUNT_PER_STEP = 8;
const TASK_COUNT = 22;

const tasks = Array(TASK_COUNT).fill().map(() => getTask());
const filters = generateFilter(tasks);

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskView = new Task(task);
  const taskEditView = new TaskEdit(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditView.getElement(), taskView.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskView.getElement(), taskEditView.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskView.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditView.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskView, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const board = new Board();
  const taskList = new TaskList();

  render(boardContainer, board, RenderPosition.BEFOREEND);
  render(board, taskList, RenderPosition.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    render(board, new NoTask(), RenderPosition.AFTERBEGIN);
    return;
  }
  render(board, new SortTemplate(), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
    renderTask(taskList.getElement(), boardTasks[i]);
  }

  if (tasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMore = new LoadMore();

    render(board, loadMore, RenderPosition.BEFOREEND);

    loadMore.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(taskList.getElement(), task));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        loadMore.getElement().remove();
        loadMore.removeElement();
      }
    });
  }
};

render(mainControl, new SiteMenu(), RenderPosition.BEFOREEND);
render(main, new Filter(filters), RenderPosition.BEFOREEND);
renderBoard(main, tasks);
