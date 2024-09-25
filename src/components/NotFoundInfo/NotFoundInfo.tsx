import styles from './NotFoundInfo.module.scss';

export const NotFoundInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалени данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};
