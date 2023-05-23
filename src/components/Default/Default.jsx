import s from './Default.module.scss';

const Default = () => {
  return (
    <section className={s.defaultForm}>
      <div className={s.defaultBox}>
        <h2 className={s.title}>Це початкова сторінка</h2>
      </div>
    </section>
  );
};

export default Default;
