import BoardView from './../view/board.js';
import TaskList from './../view/task-list.js';
import NoTask from './../view/no-task.js';
import Task from './../view/task.js';
import TaskEdit from './../view/task-edit.js';
import Sort from './../view/sort.js';
import LoadMore from './../view/load-more.js';
import {render, replace, remove} from './../utils/render.js';
import {RenderPosition} from './../utils/const.js';

const TASK_COUNT_PER_STEP = 8;

class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;

    this._boardComponent = new BoardView();
    this._taskList = new TaskList();
    this._noTask = new NoTask();
    this._sort = new Sort();
    this._loadMore = new LoadMore();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = [...boardTasks];
    this._sourcedBoardTasks = [...this._boardTasks];
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._taskList, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMore);
    }
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskList, taskComponent, RenderPosition.BEFOREEND);
  }

  _renderTasks(from, to) {
    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderLoadMoreButton() {
    render(this._boardComponent, this._loadMore, RenderPosition.BEFOREEND);

    this._loadMore.setLoadMoreClick(this._handleLoadMoreButtonClick);
  }

  _renderTaskList() {
    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      render(this._boardComponent, this._noTask, RenderPosition.AFTERBEGIN);
      return;
    }

    this._renderSort();
    this._renderTaskList();
  }
}

export default Board;
