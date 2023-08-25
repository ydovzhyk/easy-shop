import { useLocation } from 'react-router-dom';

import NotFound from 'components/NotFound/NotFound';

import s from '../../components/NotFound/NotFound.module.scss';

const NotFoundPage = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <div className={s.container}>
      <NotFound
        textContent={"We couldn't find page, you were searching for."}
        backLink={backLinkHref}
        classComp={'booWrapper'}
      />
    </div>
  );
};

export default NotFoundPage;
