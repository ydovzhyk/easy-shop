export const getDaysPassedFromDate = dateString => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const deltaTime = currentDate - date;
  const daysPassed = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
  return daysPassed;
};

export const getTimePassedFromDate = dateString => {
  const previousDate = new Date(dateString);
  const currentDate = new Date();
  const difference = currentDate - previousDate;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  if (!dateString) {
    return null;
  }
  return [days, hours, minutes];
};

export const getPhrase = (sex, lastVisit) => {
  const lastVisitArray = getTimePassedFromDate(lastVisit);
  const sexName = sex === 'Жінка' ? 'Була' : 'Був';
  if (!lastVisitArray) {
    return 'Давно не бачили';
  }
  if (
    lastVisitArray[0] === 0 &&
    lastVisitArray[1] === 0 &&
    lastVisitArray[2] === 0
  ) {
    return 'Зараз на сайті';
  }

  if (lastVisitArray[0] === 0 && lastVisitArray[1] !== 0) {
    return `${sexName}  ${lastVisitArray[1]} год. ${lastVisitArray[2]} хв. тому`;
  }
  if (lastVisitArray[0] === 0 && lastVisitArray[1] === 0) {
    return `${sexName}  ${lastVisitArray[2]} хв. тому`;
  }
  return `${sexName}  ${lastVisitArray[0]} дн. ${lastVisitArray[1]} год. ${lastVisitArray[2]} хв. тому`;
};