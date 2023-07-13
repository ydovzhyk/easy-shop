import { useLocation } from 'react-router-dom';

import s from '../../components/NotFound/NotFound.module.scss';

import NotFound from 'components/NotFound/NotFound';

const NotFoundPage = () => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <div className={s.container}>
      <NotFound
        textTop={'Нам не вдалося знайти сторінку,'}
        textBottom={'яку ви шукали.'}
        backLink={backLinkHref}
      />
    </div>
  );
};

export default NotFoundPage;
