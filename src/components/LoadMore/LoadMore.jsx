import styles from './LoadMore.module.css';
export const LoadMore = ({ onClick }) => (
  <button className={styles.Button} type="button" onClick={onClick}>
    Load more...
  </button>
);
