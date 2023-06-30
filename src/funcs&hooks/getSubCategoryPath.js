import { createSearchParams } from 'react-router-dom';

export function getSubcategoryPath(query, category, subcategory) {
  let subCategoryName = '';

  if (category === 'Чоловікам') {
    switch (subcategory) {
      case 'Верхній одяг':
        subCategoryName = 'outerwear';
        break;
      case 'Піджаки і костюми':
        subCategoryName = 'jackets & suits';
        break;
      case 'Кофти та светри':
        subCategoryName = 'coats & tops';
        break;
      case 'Сорочки та теніски':
        subCategoryName = 'shirts & t-shirts';
        break;
      case 'Футболки та майки':
        subCategoryName = 't-shirts & tank tops';
        break;
      case 'Нижня білизна':
        subCategoryName = 'underwear';
        break;
      case 'Взуття':
        subCategoryName = 'shoes';
        break;
      case 'Аксесуари':
        subCategoryName = 'accessories';
        break;
      case 'Спортивний одяг':
        subCategoryName = 'sportswear';
        break;
      case 'Одяг для дому та сну':
        subCategoryName = 'clothing for home and sleep';
        break;
      case 'Спецодяг':
        subCategoryName = 'special clothing';
        break;
      case 'Тактичний одяг':
        subCategoryName = 'tactical clothing';
        break;
      case 'Штани та шорти':
        subCategoryName = 'pants and shorts';
        break;
      default:
        subCategoryName = subcategory;
        break;
    }
  }
  if (category === 'Жінкам') {
    switch (subcategory) {
      case 'Верхній одяг':
        subCategoryName = 'outerwear';
        break;
      case 'Плаття':
        subCategoryName = 'dresses';
        break;
      case 'Спідниці':
        subCategoryName = 'skirts';
        break;
      case 'Майки і футболки':
        subCategoryName = 't-shirts and t-shirts';
        break;
      case 'Сорочки та блузи':
        subCategoryName = 'shirts and blouses';
        break;
      case 'Coats':
        subCategoryName = 'Светри';
        break;
      case 'Нижня білизна':
        subCategoryName = 'underwear';
        break;
      case 'Аксесуари':
        subCategoryName = 'accessories';
        break;
      case 'Інші речі':
        subCategoryName = 'other things';
        break;
      case 'Спортивний одяг':
        subCategoryName = 'sportswear';
        break;
      case 'Костюми':
        subCategoryName = 'suits';
        break;
      case 'Комбінезони':
        subCategoryName = 'overalls';
        break;
      case 'Одяг для дому та сну':
        subCategoryName = 'clothes for home and sleep';
        break;
      case 'Спецодяг':
        subCategoryName = 'special clothes';
        break;
      case 'Для вагітних':
        subCategoryName = 'for pregnant women';
        break;
      case 'Взуття':
        subCategoryName = 'shoes';
        break;
      case 'Штани та шорти':
        subCategoryName = 'pants and shorts';
        break;
      default:
        subCategoryName = subcategory;
        break;
    }
  }

  if (category === 'Дитячі товари') {
    switch (subcategory) {
      case 'Дитяча кімната':
        subCategoryName = "children's room";
        break;
      case 'Товари для мам':
        subCategoryName = 'products for mothers';
        break;
      case 'Харчування і годування':
        subCategoryName = 'food and feeding';
        break;
      case 'Щоденний догляд':
        subCategoryName = 'daily care';
        break;
      case 'Коляски та автокрісла':
        subCategoryName = 'strollers and car seats';
        break;
      case 'Дитячі іграшки':
        subCategoryName = "children's toys";
        break;
      case 'Дитячий транспорт':
        subCategoryName = "children's transport";
        break;
      case 'Товари для творчості':
        subCategoryName = 'products for creativity';
        break;
      case 'Активний відпочинок':
        subCategoryName = 'active recreation';
        break;
      default:
        subCategoryName = subcategory;
        break;
    }
  }

  if (category === "Краса та здоров'я") {
    switch (subcategory) {
      case 'Чоловіча косметика':
        subCategoryName = "men's cosmetics";
        break;
      case 'Аксесуари для краси':
        subCategoryName = 'beauty accessories';
        break;
      case 'Декоративна косметика':
        subCategoryName = 'decorative cosmetics';
        break;
      case 'Парфуми':
        subCategoryName = 'perfume';
        break;
      case 'Манікюр і педикюр':
        subCategoryName = 'manicure and pedicure';
        break;
      case 'Косметика для волосся':
        subCategoryName = 'hair cosmetics';
        break;
      case 'Косметика для обличчя':
        subCategoryName = 'face cosmetics';
        break;
      case 'Тіло і ванна':
        subCategoryName = 'body and bath';
        break;
      case 'Догляд за собою':
        subCategoryName = 'self-care';
        break;
      case 'Техніка для краси':
        subCategoryName = 'techniques for beauty';
        break;
      case 'Подарункові набори':
        subCategoryName = 'gift sets';
        break;
      case 'Дезінфікуючи засоби':
        subCategoryName = 'disinfectants';
        break;
      case 'Медичні прилади':
        subCategoryName = 'medical devices';
        break;
      case 'Домашня аптека':
        subCategoryName = 'home pharmacy';
        break;
      case 'Оптика':
        subCategoryName = 'optics';
        break;
      default:
        subCategoryName = subcategory;
        break;
    }
  }

  return query !== ''
    ? `${subCategoryName}?${createSearchParams({
        search: query,
      })}`
    : `${subCategoryName}`;
}
