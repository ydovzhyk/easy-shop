// import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ImAppleinc } from 'react-icons/im';
import { SiGoogleplay } from 'react-icons/si';
import { BsFacebook, BsInstagram, BsYoutube, BsTwitter } from 'react-icons/bs';
import Logo from 'components/Shared/Logo/Logo';
import s from './Footer.module.scss';

const Footer = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.mainFooterContent}>
          <div className={s.copyrightBlock}>
            <p>&copy; 2023&nbsp;</p>
            <Logo className="static"></Logo>
            {/* <Link to="/" className={s.copyrightLink}>
              EASYshop
            </Link> */}
          </div>
          <p className={s.footerMainText}>
            Модні товари для усієї сім'ї за доступною ціною.
          </p>
          <div>
            <a
              href="https://www.apple.com/ua/app-store/"
              className={s.footerBtn}
            >
              <ImAppleinc size={34} />
              <span className={s.footerBtnText}>
                Завантажити з{' '}
                <span className={s.footerBtnAccentText}>App Store</span>
              </span>
            </a>
            <a
              href="https://play.google.com/store/games?hl=ru&gl=US"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={s.footerBtn}
            >
              <SiGoogleplay size={34} />
              <span className={s.footerBtnText}>
                Доступно в{' '}
                <span className={s.footerBtnAccentText}>Google Play</span>
              </span>
            </a>
          </div>
        </div>
        <address className={s.addressFooterContent}>
          <div>
            <h3 className={s.footerMainText}>Як нас знайти?</h3>
            <ul>
              <li className={s.footerItemText}>
                <a
                  className="address__postal-link"
                  href="https://goo.gl/maps/PXWraF7CxXDFbcVw5?coh=178571&entry=tt"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {isDesctop && (
                    <>
                      Україна, 01001, <br /> місто Київ, <br /> Майдан
                      Незалежності, 1
                    </>
                  )}
                  {!isDesctop && (
                    <>Україна, 01001, місто Київ, Майдан Незалежності, 1</>
                  )}
                </a>
              </li>
              <li className={s.footerItemText}>
                <a
                  className="address__mail-link"
                  href="mailto:info@example.com"
                >
                  info@example.com
                </a>
              </li>
              <li className={s.footerItemText}>
                <a className="address__tel-link" href="tel:+380991111111">
                  +38 093 999 99 99
                </a>
              </li>
            </ul>
          </div>
        </address>
        <iframe
          className={s.iframe}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.492206915437!2d30.520694525793125!3d50.45055843735694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0xb528dc4d6dadc4f8!2z0JzQsNC50LTQsNC9INCd0LXQt9Cw0LLQuNGB0LjQvNC-0YHRgtC4LCDQmtC40LXQsiwgMDIwMDA!5e0!3m2!1sru!2sua!4v1685884669734!5m2!1sru!2sua"
          width="180"
          height="160"
          title="googleMap"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className={s.footerContentBox}>
          <h3 className={s.footerMainText}>Ми у соцмережах</h3>
          <ul className={s.footerSocialList}>
            <li className={s.footerSocialItem}>
              <a
                className={s.footerSocialLink}
                href="https://uk-ua.facebook.com/"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <BsFacebook size={25} className={s.footerSocialIcon} />
              </a>
            </li>
            <li className={s.footerSocialItem}>
              <a
                className={s.footerMainText}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <BsInstagram size={25} className={s.footerSocialIcon} />
              </a>
            </li>
            <li className={s.footerSocialItem}>
              <a
                className={s.footerSocialLink}
                href="https://twitter.com/?lang=en"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <BsTwitter size={25} className={s.footerSocialIcon} />
              </a>
            </li>
            <li className={s.footerSocialItem}>
              <a
                className={s.footerMainText}
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <BsYoutube size={27} className={s.footerSocialIcon} />
              </a>
            </li>
          </ul>
          <h3 className={s.footerAccentLink}>Команда розробників сайту</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
