export const getDeclension = amount => {
  if (amount === 1 && amount % 10 === 1 && !amount.toString().endsWith('11')) {
    return `${amount.toString()} ${'річ'}`;
  }
  if (
    amount.toString().endsWith('2' || '3' || '4') &&
    !amount.toString().endsWith('12' || '13' || '14')
  ) {
    return `${amount.toString()} ${'речі'}`;
  }
  return `${amount.toString()} ${'речей'}`;
};
