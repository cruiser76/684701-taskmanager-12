import {getRandomInt} from './../utils.js';
import {COLORS} from './../const.js';

const getDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  return descriptions[getRandomInt(0, descriptions.length - 1)];
};

const getDueDate = () => {
  let dueDate = null;

  const isDate = Boolean(getRandomInt(0, 1));

  if (isDate) {
    const maxDaysGap = 7;
    const daysGap = getRandomInt(-maxDaysGap, maxDaysGap);
    const currentDate = new Date();

    currentDate.setHours(23, 59, 59, 999);

    currentDate.setDate(currentDate.getDate() + daysGap);
    dueDate = new Date(currentDate);
  }

  return dueDate;
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInt(0, 1)),
    th: false,
    fr: false,
    sa: Boolean(getRandomInt(0, 1)),
    su: false
  };
};

const getRandomColor = () => {
  return COLORS[getRandomInt(0, COLORS.length - 1)];
};

const getTask = () => {
  const dueDate = getDueDate();
  const repeatingDays = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: getDescription(),
    dueDate,
    repeatingDays,
    color: getRandomColor(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    isArchive: true,
  };
};

export default getTask;
