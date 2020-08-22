import SiteMenu from './view/site-menu.js';
import Filter from './view/filter.js';
import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';
import {RenderPosition} from './utils/const.js';
import BoardManager from './presenter/board.js';

import getTask from './mock/task.js';

const TASK_COUNT = 22;

const tasks = Array(TASK_COUNT).fill().map(() => getTask());
const filters = generateFilter(tasks);

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, new SiteMenu(), RenderPosition.BEFOREEND);
render(main, new Filter(filters), RenderPosition.BEFOREEND);

const BoardPresenter = new BoardManager(main);
BoardPresenter.init(tasks);

