import { ReactComponent as Women } from '../../images/dropDownMenu/women.svg';
import { ReactComponent as Men } from '../../images/dropDownMenu/men.svg';
import { ReactComponent as Sport } from '../../images/dropDownMenu/sport.svg';
import { ReactComponent as Kids } from '../../images/dropDownMenu/kids.svg';
import categoryOptions from '../AddProduct/category.json';

let menuItems = [];
let categoryName = '';
let subCategoryName = '';

const categories = Object.entries(categoryOptions).forEach(([key, value]) => {
  console.log(value);
  switch (key) {
    case 'women':
      categoryName = 'Жінкам';
      break;
    case 'men':
      categoryName = 'Чоловікам';
      break;
    case 'children':
      categoryName = 'Дитячі товари';
      break;
    case 'beauty&health':
      categoryName = "Краса та здоров'я";
      break;
    default:
      break;
  }

  if (categoryName === 'Чоловікам') {
    switch (value) {
      case 'outerwear':
        subCategoryName = 'Верхній одяг';
        break;
      case 'jackets & suits':
        subCategoryName = 'Піджаки і костюми';
        break;
      case 'coats & tops':
        subCategoryName = 'Кофти та светри';
        break;
      case 'shirts & t-shirts':
        subCategoryName = 'Сорочки та теніски';
        break;
      case 't-shirts & tank tops':
        subCategoryName = 'Футболки та майки';
        break;
      case 'underwear':
        subCategoryName = 'Нижня білизна';
        break;
      case 'shoes':
        subCategoryName = 'Взуття';
        break;
      case 'accessories':
        subCategoryName = 'Аксесуари';
        break;
      case 'sportswear':
        subCategoryName = 'Спортивний одяг';
        break;
      case 'clothing for home and sleep':
        subCategoryName = 'Одяг для дому та сну';
        break;
      case 'special clothing':
        subCategoryName = 'Спецодяг';
        break;
      case 'tactical clothing':
        subCategoryName = 'Тактичний одяг';
        break;
      case 'pants and shorts':
        subCategoryName = 'Штани та шорти';
        break;
      default:
        break;
    }
  }
  if (categoryName === 'Жінкам') {
    switch (value) {
      case 'outerwear':
        subCategoryName = 'Верхній одяг';
        break;
      case 'dresses':
        subCategoryName = 'Плаття';
        break;
      case 'skirts':
        subCategoryName = 'Спідниці';
        break;
      case 't-shirts and t-shirts':
        subCategoryName = 'Майки і футболки';
        break;
      case 'shirts and blouses':
        subCategoryName = 'Сорочки та блузи';
        break;
      case 'Светри':
        subCategoryName = 'Coats';
        break;
      case 'underwear':
        subCategoryName = 'Нижня білизна';
        break;
      case 'accessories':
        subCategoryName = 'Аксесуари';
        break;
      case 'other things':
        subCategoryName = 'Інші речі';
        break;
      case 'sportswear':
        subCategoryName = 'Спортивний одяг';
        break;
      case 'suits':
        subCategoryName = 'Костюми';
        break;
      case 'overalls':
        subCategoryName = 'Комбінезони';
        break;
      case 'clothes for home and sleep':
        subCategoryName = 'Одяг для дому та сну';
        break;
      case 'special clothes':
        subCategoryName = 'Спецодяг';
        break;
      case 'for pregnant women':
        subCategoryName = 'Для вагітних';
        break;
      case 'shoes':
        subCategoryName = 'Взуття';
        break;
      case 'pants and shorts':
        subCategoryName = 'Штани та шорти';
        break;
      default:
        break;
    }
  }

  if (categoryName === 'Дитячі товари') {
    switch (value) {
      case "children's room":
        subCategoryName = 'Дитяча кімната';
        break;
      case 'products for mothers':
        subCategoryName = 'Товари для мам';
        break;
      case 'food and feeding':
        subCategoryName = 'Харчування і годування';
        break;
      case 'daily care':
        subCategoryName = 'Щоденний догляд';
        break;
      case 'strollers and car seats':
        subCategoryName = 'Коляски та автокрісла';
        break;
      case "children's toys":
        subCategoryName = 'Дитячі іграшки';
        break;
      case "children's transport":
        subCategoryName = 'Дитячий транспорт';
        break;
      case 'products for creativity':
        subCategoryName = 'Товари для творчості';
        break;
      case 'active recreation':
        subCategoryName = 'Активний відпочинок';
        break;
      default:
        break;
    }
  }

  if (categoryName === "Краса та здоров'я") {
    switch (value) {
      case "men's cosmetics":
        subCategoryName = 'Чоловіча косметика';
        break;
      case 'beauty accessories':
        subCategoryName = 'Аксесуари для краси';
        break;
      case 'decorative cosmetics':
        subCategoryName = 'Декоративна косметика';
        break;
      case 'perfume':
        subCategoryName = 'Парфуми';
        break;
      case 'manicure and pedicure':
        subCategoryName = 'Манікюр і педикюр';
        break;
      case 'hair cosmetics':
        subCategoryName = 'Косметика для волосся';
        break;
      case 'face cosmetics':
        subCategoryName = 'Косметика для обличчя';
        break;
      case 'body and bath':
        subCategoryName = 'Тіло і ванна';
        break;
      case 'self-care':
        subCategoryName = 'Догляд за собою';
        break;
      case 'techniques for beauty':
        subCategoryName = 'Техніка для краси';
        break;
      case 'gift sets':
        subCategoryName = 'Подарункові набори';
        break;
      case 'disinfectants':
        subCategoryName = 'Дезінфікуючи засоби';
        break;
      case 'medical devices':
        subCategoryName = 'Медичні прилади';
        break;
      case 'home pharmacy':
        subCategoryName = 'Домашня аптека';
        break;
      case 'optics':
        subCategoryName = 'Оптика';
        break;
      default:
        break;
    }
  }
  return (menuItems = [
    {
      id: 1,
      name: categoryName,
      link: '/products/women',
      icon: <Women style={{ width: '30px', height: '30px' }} />,
      alt: 'alt',
      submenu: [
        {
          id: 1,
          name: 'Верхній одяг',
          link: '/products/women/outerwear',
        },
        {
          id: 2,
          name: 'Піджаки і костюми',
          link: '/products/women/jackets & suits',
        },
        {
          id: 3,
          name: 'Кофти та светри',
          link: '/products/women/coats & tops',
        },
        {
          id: 4,
          name: 'Сорочки та теніски',
          link: '/products/women/shirts & t-shirts',
        },
        {
          id: 5,
          name: 'Футболки та майки',
          link: '/products/women/t-shirts & tank topsг',
        },
        { id: 6, name: 'Нижня білизна', link: '/products/women/underwear' },
        {
          id: 7,
          name: 'Взуття',
          link: '/products/women/shoes',
        },
        { id: 8, name: 'Аксесуари', link: '/products/women/accessories' },
        { id: 9, name: 'Спортивний одяг', link: '/products/women/sportswear' },
        {
          id: 10,
          name: 'Одяг для дому та сну',
          link: '/products/women/clothing for home and sleep',
        },
        {
          id: 11,
          name: 'Спецодяг',
          link: '/products/women/special clothing',
        },
        {
          id: 12,
          name: 'Тактичний одяг',
          link: '/products/women/tactical clothing',
        },
        {
          id: 13,
          name: 'Штани та шорти',
          link: '/products/women/pants and shorts',
        },
      ],
    },
    {
      id: 2,
      name: `${key}`,
      link: '/products/`${key}`',
      icon: <Men style={{ width: '30px', height: '30px' }} />,
      submenu: [
        {
          id: 1,
          name: 'Верхній одяг',
          link: '/products/women/outerwear',
        },
        {
          id: 2,
          name: 'Піджаки і костюми',
          link: '/products/women/jackets & suits',
        },
        {
          id: 3,
          name: 'Кофти та светри',
          link: '/products/women/coats & tops',
        },
        {
          id: 4,
          name: 'Сорочки та теніски',
          link: '/products/women/shirts & t-shirts',
        },
        {
          id: 5,
          name: 'Футболки та майки',
          link: '/products/women/t-shirts & tank topsг',
        },
        { id: 6, name: 'Нижня білизна', link: '/products/women/underwear' },
        {
          id: 7,
          name: 'Взуття',
          link: '/products/women/shoes',
        },
        { id: 8, name: 'Аксесуари', link: '/products/women/accessories' },
        { id: 9, name: 'Спортивний одяг', link: '/products/women/sportswear' },
        {
          id: 10,
          name: 'Одяг для дому та сну',
          link: '/products/women/clothing for home and sleep',
        },
        {
          id: 11,
          name: 'Спецодяг',
          link: '/products/women/special clothing',
        },
        {
          id: 12,
          name: 'Тактичний одяг',
          link: '/products/women/tactical clothing',
        },
        {
          id: 13,
          name: 'Штани та шорти',
          link: '/products/women/pants and shorts',
        },
      ],
    },
    {
      id: 3,
      name: 'Дитячі товари',
      link: '/products/children',
      icon: <Kids style={{ width: '30px', height: '30px' }} />,
      submenu: [
        {
          id: 1,
          name: 'Дитяча кімната',
          link: '/products/children/верхній одяг',
        },
        { id: 2, name: 'Товари для мам', link: '/products/children/труси' },
        {
          id: 3,
          name: 'Харчування і годування',
          link: '/products/children/рубашки',
        },
        {
          id: 4,
          name: 'Щоденний догляд',
          link: '/products/children/рубашки',
        },
        {
          id: 5,
          name: 'Коляски та автокрісла',
          link: '/products/children/рубашки',
        },
        { id: 6, name: 'Дитячі іграшки', link: '/products/children/рубашки' },
        {
          id: 7,
          name: 'Дитячий транспорт',
          link: '/products/children/рубашки',
        },
        {
          id: 8,
          name: 'Товари для творчості',
          link: '/products/children/рубашки',
        },
        {
          id: 9,
          name: 'Активний відпочинок',
          link: '/products/children/рубашки',
        },
      ],
    },
    {
      id: 4,
      name: 'Краса та здоров`я',
      link: '/products/beauty_and_health',
      icon: <Sport style={{ width: '30px', height: '30px' }} />,
      submenu: [
        {
          id: 1,
          name: 'Чоловіча косметика',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 2,
          name: 'Аксесуари для краси',
          link: '/products/beauty_and_health/труси',
        },
        {
          id: 3,
          name: 'Декоративна косметика',
          link: '/products/beauty_and_health/рубашки',
        },
        {
          id: 4,
          name: 'Парфуми',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 5,
          name: 'Манікюр і педикюр',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 6,
          name: 'Косметика для волосся',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 7,
          name: 'Косметика для обличчя',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 8,
          name: 'Тіло і ванна',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 9,
          name: 'Догляд за собою',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 10,
          name: 'Техніка для краси',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 11,
          name: 'Подарункові набори',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 12,
          name: 'Дезінфікуючи засоби',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 13,
          name: 'Медичні прилади',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 14,
          name: 'Домашня аптека',
          link: '/products/beauty_and_health/верхній одяг',
        },
        {
          id: 15,
          name: 'Оптика',
          link: '/products/beauty_and_health/верхній одяг',
        },
      ],
    },
  ]);
});

const menuItem = [
  {
    id: 1,
    name: 'Жінкам',
    link: '/products/women',
    icon: <Women style={{ width: '30px', height: '30px' }} />,
    alt: 'alt',
    submenu: [
      { id: 1, name: 'Верхній одяг', link: '/products/women/верхній одяг' },
      { id: 2, name: 'Плаття', link: '/products/women/труси' },
      { id: 3, name: 'Спідниці', link: '/products/women/рубашки' },
      { id: 4, name: 'Майки і футболки', link: '/products/women/верхній одяг' },
      { id: 5, name: 'Сорочки та блузи', link: '/products/women/верхній одяг' },
      { id: 6, name: 'Кофти', link: '/products/women/верхній одяг' },
      { id: 7, name: 'Нижня білизна', link: '/products/women/верхній одяг' },
      { id: 8, name: 'Аксесуари', link: '/products/women/верхній одяг' },
      { id: 9, name: 'Інші речі', link: '/products/women/верхній одяг' },
      { id: 10, name: 'Спортивний одяг', link: '/products/women/верхній одяг' },
      { id: 11, name: 'Костюми', link: '/products/women/верхній одяг' },
      { id: 12, name: 'Комбінезони', link: '/products/women/верхній одяг' },
      {
        id: 13,
        name: 'Одяг для дому та сну',
        link: '/products/women/верхній одяг',
      },
      { id: 14, name: 'Спецодяг', link: '/products/women/верхній одяг' },
      { id: 15, name: 'Для вагітних', link: '/products/women/верхній одяг' },
      { id: 16, name: 'Штани та шорти', link: '/products/women/верхній одяг' },
    ],
  },
  {
    id: 2,
    name: 'Чоловікам',
    link: '/products/men',
    icon: <Men style={{ width: '30px', height: '30px' }} />,
    submenu: [
      { id: 1, name: 'Верхній одяг', link: '/products/men/верхній одяг' },
      { id: 2, name: 'Піджаки і костюми', link: '/products/men/труси' },
      { id: 3, name: 'Кофти та Светри', link: '/products/men/рубашки' },
      { id: 4, name: 'Сорочки та теніски', link: '/products/men/верхній одяг' },
      { id: 5, name: 'Футболки та майки', link: '/products/men/верхній одяг' },
      { id: 6, name: 'Нижня білизна', link: '/products/men/верхній одяг' },
      { id: 7, name: 'Взуття', link: '/products/men/верхній одяг' },
      { id: 8, name: 'Аксесуари', link: '/products/men/верхній одяг' },
      { id: 9, name: 'Спортивний одяг', link: '/products/men/верхній одяг' },
      {
        id: 10,
        name: 'Одяг для дому та сну',
        link: '/products/men/верхній одяг',
      },
      { id: 11, name: 'Спецодяг', link: '/products/men/верхній одяг' },
      { id: 12, name: 'Тактичний одяг', link: '/products/men/верхній одяг' },
      { id: 13, name: 'Штани та шорти', link: '/products/men/верхній одяг' },
    ],
  },
  {
    id: 3,
    name: 'Дитячі товари',
    link: '/products/children',
    icon: <Kids style={{ width: '30px', height: '30px' }} />,
    submenu: [
      {
        id: 1,
        name: 'Дитяча кімната',
        link: '/products/children/верхній одяг',
      },
      { id: 2, name: 'Товари для мам', link: '/products/children/труси' },
      {
        id: 3,
        name: 'Харчування і годування',
        link: '/products/children/рубашки',
      },
      { id: 4, name: 'Щоденний догляд', link: '/products/children/рубашки' },
      {
        id: 5,
        name: 'Коляски та автокрісла',
        link: '/products/children/рубашки',
      },
      { id: 6, name: 'Дитячі іграшки', link: '/products/children/рубашки' },
      { id: 7, name: 'Дитячий транспорт', link: '/products/children/рубашки' },
      {
        id: 8,
        name: 'Товари для творчості',
        link: '/products/children/рубашки',
      },
      {
        id: 9,
        name: 'Активний відпочинок',
        link: '/products/children/рубашки',
      },
    ],
  },
  {
    id: 4,
    name: 'Краса та здоров`я',
    link: '/products/beauty_and_health',
    icon: <Sport style={{ width: '30px', height: '30px' }} />,
    submenu: [
      {
        id: 1,
        name: 'Чоловіча косметика',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 2,
        name: 'Аксесуари для краси',
        link: '/products/beauty_and_health/труси',
      },
      {
        id: 3,
        name: 'Декоративна косметика',
        link: '/products/beauty_and_health/рубашки',
      },
      {
        id: 4,
        name: 'Парфуми',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 5,
        name: 'Манікюр і педикюр',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 6,
        name: 'Косметика для волосся',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 7,
        name: 'Косметика для обличчя',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 8,
        name: 'Тіло і ванна',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 9,
        name: 'Догляд за собою',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 10,
        name: 'Техніка для краси',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 11,
        name: 'Подарункові набори',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 12,
        name: 'Дезінфікуючи засоби',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 13,
        name: 'Медичні прилади',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 14,
        name: 'Домашня аптека',
        link: '/products/beauty_and_health/верхній одяг',
      },
      {
        id: 15,
        name: 'Оптика',
        link: '/products/beauty_and_health/верхній одяг',
      },
    ],
  },
];

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
