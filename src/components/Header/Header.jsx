import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useForm, Controller } from 'react-hook-form';
import UserInfo from 'components/UserInfo/UserInfo';
import { getLogin } from 'redux/auth/auth-selectors';
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlineBars4 } from 'react-icons/hi2';
import s from './Header.module.scss';
import Logo from 'components/Shared/Logo';
import Button from 'components/Shared/Button';
import SwitchBtn from 'components/Shared/SwitchBtn/SwitchBtn';
import LanguageChanger from 'components/Shared/LanguageChanger/LanguageChanger';
import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

const Header = () => {
  // const dispatch = useDispatch();
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  const isLogin = useSelector(getLogin);

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      category: '',
      shopName: '',
      description: '',
      price: '',
      files: [],
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const dataForUpload = {
      data: {
        category: data.category.value,
        shopName: data.shopName,
        description: data.description,
        price: data.price,
      },
      files: new FormData(),
    };

    Array.from(data.files).forEach(file => {
      dataForUpload.files.append('files', file);
    });

    // await dispatch(addProduct(dataForUpload));
    reset();
  };

  return (
    <header className={s.header}>
      <div className={s.containerTop}>
        {!isDesctop && (
          <>
            <div className={s.navTopContainer}>
              <Button
                type="button"
                btnClass="burgerButton"
                text={<HiOutlineBars4 size={isMobile ? 25 : 30} />}
              ></Button>
              <Logo />
            </div>
            <div className={s.btnWrapper}>
              <Button
                type="button"
                btnClass="searchBtn"
                text={<BiSearchAlt size={isMobile ? 25 : 30} />}
              ></Button>
              <div className={s.switchBtnBox}>
                <LanguageChanger />
                <SwitchBtn />
              </div>
            </div>
          </>
        )}

        {isDesctop && (
          <>
            <Logo />
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="category"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    value={value}
                    handleChange={onChange}
                    name="category"
                    {...field.category}
                    required={true}
                    classLabel="headerLabel"
                    classSelect="headerSelect"
                    options={['Жінкам', 'Чоловікам', 'Дитячі речі']}
                  />
                )}
              />
              <Controller
                control={control}
                name="productName"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    control={control}
                    handleChange={onChange}
                    classLabel="headerLabel"
                    classInput="headerInput"
                    classSpan="headerSpan"
                    {...field.productName}
                  />
                )}
              />
              <Button
                type="button"
                btnClass="searchFormBtn"
                text={<BiSearchAlt size={isMobile ? 25 : 30} />}
              ></Button>
            </form>
            <Button text="Додати товар" btnClass="btnLight" />
            <div className={s.switchBtnBox}>
              <LanguageChanger />
              <SwitchBtn />
            </div>
            <UserInfo />
          </>
        )}
      </div>

      {isLogin && (
        <div className={s.containerBottom}>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/restaurants',
            })}
            to="/restaurants"
          >
            Жінкам
          </NavLink>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/supermarkets',
            })}
            to="/supermarkets"
          >
            Чоловікам
          </NavLink>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/health',
            })}
            to="/health"
          >
            Дитячі речі
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
