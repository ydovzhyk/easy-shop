import { SlArrowRight } from 'react-icons/sl';
import s from './TopNavProducts.module.scss';

const TopNavProducts = ({ category, subcategory }) => {
  let categoryName = '';
  let subCategoryName = '';

  switch (category) {
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
      categoryName = `Категорія ${category} відсутня`;
      break;
  }

  if (categoryName === 'Чоловікам') {
    switch (subcategory) {
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
        subCategoryName = `Підкатегорія ${subcategory} відсутня`;
        break;
    }
  }
  if (categoryName === 'Жінкам') {
    switch (subcategory) {
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
        subCategoryName = `Підкатегорія ${subcategory} відсутня`;
        break;
    }
  }

  if (categoryName === 'Дитячі товари') {
    switch (subcategory) {
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
        subCategoryName = `Підкатегорія ${subcategory} відсутня`;
        break;
    }
  }

  if (categoryName === "Краса та здоров'я") {
    switch (subcategory) {
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
        subCategoryName = `Підкатегорія ${subcategory} відсутня`;
        break;
    }
  }

  return (
    <div className={s.catalogTitle}>
      {category && (
        <>
          <h2 style={{ marginRight: '10px' }}>{categoryName}</h2>
          <SlArrowRight style={{ marginRight: '10px' }} />
        </>
      )}
      {subcategory && (
        <>
          <h2 style={{ marginRight: '10px' }}>{subCategoryName}</h2>
          <SlArrowRight />
        </>
      )}
      {!category && !subcategory && <p>tdПошук у всіх категоріях</p>}
    </div>
  );
};

export default TopNavProducts;
