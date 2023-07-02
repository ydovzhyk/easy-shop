import { createSearchParams } from 'react-router-dom';

export function getPath(query, category, isCurrentPageProducts = false) {
  let firstPartPath = '';
  switch (category) {
    case 'Жінкам':
      firstPartPath = !isCurrentPageProducts ? 'products/women' : 'women';
      break;
    case 'Чоловікам':
      firstPartPath = !isCurrentPageProducts ? 'products/men' : 'men';
      break;
    case 'Дитячі товари':
      firstPartPath = !isCurrentPageProducts ? 'products/children' : 'children';
      break;
    case "Краса та здоров'я":
      firstPartPath = !isCurrentPageProducts
        ? 'products/beauty&health'
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
