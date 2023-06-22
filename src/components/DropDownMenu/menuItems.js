import { ReactComponent as Women } from '../../images/dropDownMenu/women.svg';
import { ReactComponent as Men } from '../../images/dropDownMenu/men.svg';
import { ReactComponent as Sport } from '../../images/dropDownMenu/sport.svg';
import { ReactComponent as Kids } from '../../images/dropDownMenu/kids.svg';
import categoryOptions from '../AddProduct/category.json';

let categoryName = '';
let iconCategory = '';
let subCategoryName = '';

const menuItems = Object.keys(categoryOptions).map((el, index) => {
  switch (el) {
    case 'Жінкам':
      categoryName = 'women';
      iconCategory = <Women style={{ width: '30px', height: '30px' }} />;
      break;
    case 'Чоловікам':
      categoryName = 'men';
      iconCategory = <Men style={{ width: '30px', height: '30px' }} />;
      break;
    case 'Дитячі товари':
      categoryName = 'children';
      iconCategory = <Kids style={{ width: '30px', height: '30px' }} />;
      break;
    case "Краса та здоров'я":
      categoryName = 'beauty&health';
      iconCategory = <Sport style={{ width: '30px', height: '30px' }} />;
      break;
    default:
      break;
  }

  return {
    id: index,
    name: el,
    link: `/products/${categoryName}`,
    icon: iconCategory,
    alt: 'alt',
    submenu: Object.values(categoryOptions)[index].map((elem, indx) => {
      if (el === 'Чоловікам') {
        switch (elem) {
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
            break;
        }
      }
      if (el === 'Жінкам') {
        switch (elem) {
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
            break;
        }
      }

      if (el === 'Дитячі товари') {
        switch (elem) {
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
            break;
        }
      }

      if (el === "Краса та здоров'я") {
        switch (elem) {
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
            break;
        }
      }
      return {
        id: indx,
        name: elem,
        link: `/products/${categoryName}/${subCategoryName}`,
      };
    }),
  };
});

// const menuItems = [
//   {
//     id: 1,
//     name: 'Жінкам',
//     link: '/products/women',
//     icon: <Women style={{ width: '30px', height: '30px' }} />,
//     alt: 'alt',
//     submenu: [
//       { id: 1, name: 'Верхній одяг', link: '/products/women/верхній одяг' },
//       { id: 2, name: 'Плаття', link: '/products/women/труси' },
//       { id: 3, name: 'Спідниці', link: '/products/women/рубашки' },
//       { id: 4, name: 'Майки і футболки', link: '/products/women/верхній одяг' },
//       { id: 5, name: 'Сорочки та блузи', link: '/products/women/верхній одяг' },
//       { id: 6, name: 'Кофти', link: '/products/women/верхній одяг' },
//       { id: 7, name: 'Нижня білизна', link: '/products/women/верхній одяг' },
//       { id: 8, name: 'Аксесуари', link: '/products/women/верхній одяг' },
//       { id: 9, name: 'Інші речі', link: '/products/women/верхній одяг' },
//       { id: 10, name: 'Спортивний одяг', link: '/products/women/верхній одяг' },
//       { id: 11, name: 'Костюми', link: '/products/women/верхній одяг' },
//       { id: 12, name: 'Комбінезони', link: '/products/women/верхній одяг' },
//       { id: 13, name: 'Одяг для дому та сну', link: '/products/women/верхній одяг' },
//       { id: 14, name: 'Спецодяг', link: '/products/women/верхній одяг' },
//       { id: 15, name: 'Для вагітних', link: '/products/women/верхній одяг' },
//       { id: 16, name: 'Штани та шорти', link: '/products/women/верхній одяг' },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Чоловікам',
//     link: '/products/men',
//     icon: <Men style={{ width: '30px', height: '30px' }} />,
//     submenu: [
//       { id: 1, name: 'Верхній одяг', link: '/products/men/верхній одяг' },
//       { id: 2, name: 'Піджаки і костюми', link: '/products/men/труси' },
//       { id: 3, name: 'Кофти та Светри', link: '/products/men/рубашки' },
//       { id: 4, name: 'Сорочки та теніски', link: '/products/men/верхній одяг' },
//       { id: 5, name: 'Футболки та майки', link: '/products/men/верхній одяг' },
//       { id: 6, name: 'Нижня білизна', link: '/products/men/верхній одяг' },
//       { id: 7, name: 'Взуття', link: '/products/men/верхній одяг' },
//       { id: 8, name: 'Аксесуари', link: '/products/men/верхній одяг' },
//       { id: 9, name: 'Спортивний одяг', link: '/products/men/верхній одяг' },
//       { id: 10, name: 'Одяг для дому та сну', link: '/products/men/верхній одяг' },
//       { id: 11, name: 'Спецодяг', link: '/products/men/верхній одяг' },
//       { id: 12, name: 'Тактичний одяг', link: '/products/men/верхній одяг' },
//       { id: 13, name: 'Штани та шорти', link: '/products/men/верхній одяг' },
//     ],
//   },
//   {
//     id: 3,
//     name: 'Дитячі товари',
//     link: '/products/children',
//     icon: <Kids style={{ width: '30px', height: '30px' }} />,
//     submenu: [
//       { id: 1, name: 'Дитяча кімната', link: '/products/children/верхній одяг' },
//       { id: 2, name: 'Товари для мам', link: '/products/children/труси' },
//       { id: 3, name: 'Харчування і годування', link: '/products/children/рубашки' },
//       { id: 4, name: 'Щоденний догляд', link: '/products/children/рубашки' },
//       { id: 5, name: 'Коляски та автокрісла', link: '/products/children/рубашки' },
//       { id: 6, name: 'Дитячі іграшки', link: '/products/children/рубашки' },
//       { id: 7, name: 'Дитячий транспорт', link: '/products/children/рубашки' },
//       { id: 8, name: 'Товари для творчості', link: '/products/children/рубашки' },
//       { id: 9, name: 'Активний відпочинок', link: '/products/children/рубашки' },
//     ],
//   },
//   {
//     id: 4,
//     name: 'Краса та здоров`я',
//     link: '/products/beauty_and_health',
//     icon: <Sport style={{ width: '30px', height: '30px' }} />,
//     submenu: [
//       { id: 1, name: 'Чоловіча косметика', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 2, name: 'Аксесуари для краси', link: '/products/beauty_and_health/труси' },
//       { id: 3, name: 'Декоративна косметика', link: '/products/beauty_and_health/рубашки' },
//       { id: 4, name: 'Парфуми', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 5, name: 'Манікюр і педикюр', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 6, name: 'Косметика для волосся', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 7, name: 'Косметика для обличчя', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 8, name: 'Тіло і ванна', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 9, name: 'Догляд за собою', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 10, name: 'Техніка для краси', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 11, name: 'Подарункові набори', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 12, name: 'Дезінфікуючи засоби', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 13, name: 'Медичні прилади', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 14, name: 'Домашня аптека', link: '/products/beauty_and_health/верхній одяг' },
//       { id: 15, name: 'Оптика', link: '/products/beauty_and_health/верхній одяг' },
//     ],
//   },
// ];

export default menuItems;
