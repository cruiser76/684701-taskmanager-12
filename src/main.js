import SiteMenu from './view/site-menu.js';
import {render} from './utils/render.js';
import {RenderPosition} from './utils/const.js';
import TasksModel from "./model/tasks.js";
import BoardPresenter from './presenter/board.js';
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";

import getTask from './mock/task.js';

const TASK_COUNT = 22;

const tasks = Array(TASK_COUNT).fill().map(() => getTask());

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);


render(mainControl, new SiteMenu(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(main, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, tasksModel);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
