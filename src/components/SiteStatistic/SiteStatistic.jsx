import s from './SiteStatistic.module.scss';

const SiteStatistic = () => {
  return (
    <section className={s.statistic}>
      <div className={s.defaultBoxStatistic}>
        <h2 className={s.title}>Статистика сайту</h2>
        <div>
          <p>Категорій магазинів</p>
          <span className={s.goodsNumber}>{}</span>
        </div>
        <div>
          <p>Усього товарів</p>
          <span className={s.goodsNumber}>{}</span>
        </div>
        <div>
          <p>Користувачів</p>
          <span className={s.goodsNumber}>{}</span>
        </div>
      </div>
    </section>
  );
};

export default SiteStatistic;
