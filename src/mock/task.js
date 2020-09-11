import {getRandomInt} from './../utils/common.js';
import {COLORS} from './../utils/const.js';

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
    id: generateId(),
    description: getDescription(),
    dueDate,
    repeatingDays,
    color: getRandomColor(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    isArchive: Boolean(getRandomInt(0, 1)),
  };
};

export default getTask;
