import { useTypedSelector } from '../../hooks/useTypedSelector';
import { BookItem } from '../BookItem/BookItem';
import styles from './BookList.module.scss';

export const BookList = () => {
  const state = useTypedSelector((state) => state.book.items);

  return (
    <div className={styles.wrapper}>
      {state.map((book) => (
        <BookItem
          key={book.id}
          author={book.author}
          title={book.title}
          image={book.image}
          id={book.id}
        />
      ))}
    </div>
  );
};
