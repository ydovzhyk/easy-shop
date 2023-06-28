import { ReactComponent as Women } from '../../images/dropDownMenu/women.svg';
import { ReactComponent as Men } from '../../images/dropDownMenu/men.svg';
import { ReactComponent as Sport } from '../../images/dropDownMenu/sport.svg';
import { ReactComponent as Kids } from '../../images/dropDownMenu/kids.svg';
const menuItems = [
  {
    id: 1,
    name: 'Жінкам',
    link: 'жінкам',
    icon: <Women style={{ width: '30px', height: '30px', fill: 'var(--text-color)' }} />,
    alt: 'alt',
    submenu: [
      { id: 1, name: 'Верхній одяг', link: 'жінкам/верхній одяг' },
      { id: 2, name: 'Плаття', link: '/products/women/плаття' },
      { id: 3, name: 'Спідниці', link: 'жінкам+взуття' },
      {
        id: 4,
        name: 'Майки і футболки',
        link: '/products/women/майки і футболки',
      },
      {
        id: 5,
        name: 'Сорочки та блузи',
        link: '/products/women/сорочки та блузи',
      },
      { id: 6, name: 'Кофти', link: '/products/women/кофти' },
      { id: 7, name: 'Нижня білизна', link: '/products/women/нижня білизна' },
      { id: 8, name: 'Аксесуари', link: '/products/women/аксесуари' },

      { id: 9, name: 'Інші речі', link: '/products/women/інші речі' },
      {
        id: 10,
        name: 'Спортивний одяг',
        link: '/products/women/спортивний одяг',
      },
      { id: 11, name: 'Костюми', link: '/products/women/костюми' },
      { id: 12, name: 'Комбінезони', link: '/products/women/комбінезони' },
      {
        id: 13,
        name: 'Одяг для дому та сну',
        link: '/products/women/одяг для дому та сну',
      },

      { id: 14, name: 'Спецодяг', link: '/products/women/спецодяг' },
      { id: 15, name: 'Для вагітних', link: '/products/women/для вагітних' },
      { id: 16, name: 'Взуття', link: 'жінкам+взуття' },
      {
        id: 17,
        name: 'Штани та шорти',
        link: '/products/women/штани та шорти',
      },
    ],
  },
  {
    id: 2,
    name: 'Чоловікам',
    link: 'чоловікам',
    icon: <Men style={{ width: '30px', height: '30px' , fill: 'var(--text-color)'}} />,
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
    link: 'дитячі+товари',
    icon: <Kids style={{ width: '30px', height: '30px' , fill: 'var(--text-color)'}} />,
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
    link: 'краса+та+здоров',
    icon: <Sport style={{ width: '30px', height: '30px' , fill: 'var(--text-color)'}} />,
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

export default menuItems;
