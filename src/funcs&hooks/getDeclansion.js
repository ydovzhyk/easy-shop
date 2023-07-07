export const getDeclension = amount => {
  if (amount === 1 && amount % 10 === 1 && !amount.toString().endsWith('11')) {
    return `${amount.toString()} ${'річ'}`;
  }
  if (
    (amount.toString().endsWith('2') ||
      amount.toString().endsWith('3') ||
      amount.toString().endsWith('4')) &&
    (!amount.toString().endsWith('12') ||
      !amount.toString().endsWith('13') ||
      !amount.toString().endsWith('14'))
  ) {
    return `${amount.toString()} ${'речі'}`;
  }

  return `${amount.toString()} ${'речей'}`;
};
