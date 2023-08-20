import { createSearchParams } from 'react-router-dom';

export function getPath(query, category, isCurrentPageProducts = false) {
  let firstPartPath = '';
  switch (category) {
    case 'Жінкам':
      firstPartPath = !isCurrentPageProducts ? 'product/women' : 'women';
      break;
    case 'Чоловікам':
      firstPartPath = !isCurrentPageProducts ? 'product/men' : 'men';
      break;
    case 'Дитячі товари':
      firstPartPath = !isCurrentPageProducts ? 'product/children' : 'children';
      break;
    case "Краса та здоров'я":
      firstPartPath = !isCurrentPageProducts
        ? 'product/beauty&health'
        : 'beauty&health';
      break;
    default:
      break;
  }
  return query !== ''
    ? `${firstPartPath}?${createSearchParams({
        search: query,
      })}`
    : `${firstPartPath}`;
}
