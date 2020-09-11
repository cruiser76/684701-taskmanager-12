import SiteMenu from './view/site-menu.js';
import Filter from './view/filter.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';
import {RenderPosition} from './utils/const.js';
import TasksModel from "./model/tasks.js";
import BoardManager from './presenter/board.js';

import getTask from './mock/task.js';

const TASK_COUNT = 22;

const tasks = Array(TASK_COUNT).fill().map(() => getTask());
const filters = generateFilter(tasks);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

const BoardPresenter = new BoardManager(main, tasksModel);

render(mainControl, new SiteMenu(), RenderPosition.BEFOREEND);
render(main, new Filter(filters), RenderPosition.BEFOREEND);

BoardPresenter.init(tasks);
