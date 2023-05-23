import s from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.copyrightBlock}>
          <p className={s.copyright}>&copy; 2023</p>
          <a href="/" className={s.copyrightLink}>
            Easy shop
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
