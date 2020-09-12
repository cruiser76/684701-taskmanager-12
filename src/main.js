import SiteMenu from './view/site-menu.js';
import {render, remove} from './utils/render.js';
import {RenderPosition, MenuItem, UpdateType, FilterType} from './utils/const.js';
import TasksModel from "./model/tasks.js";
import BoardPresenter from './presenter/board.js';
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";

import getTask from './mock/task.js';

const TASK_COUNT = 22;

const tasks = Array(TASK_COUNT).fill().map(() => getTask());

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenu();


render(mainControl, siteMenuComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(main, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, tasksModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(main, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);


filterPresenter.init();
boardPresenter.init();
