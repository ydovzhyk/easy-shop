import { Oval } from 'react-loader-spinner';
// import { useMediaQuery } from 'react-responsive';

import s from './Loader.module.scss';

const Loader = () => {
  // const isDesktop = useMediaQuery({ minWidth: 1280 });
  // const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className={s.loader}>
      <Oval
        height="130"
        width="130"
        color="#fbef35"
        secondaryColor="transparent"
      />
    </div>
  );
};

export default Loader;
