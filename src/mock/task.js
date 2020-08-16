import getRandomInt from './../utils.js';

const getDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  return descriptions[getRandomInt(0, descriptions.length)];
};

const getTask = () => {
  return {
    description: getDescription()
  };
};

export default getTask;
