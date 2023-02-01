import { useTypedSelector } from '../../hooks/useTypedSelector';
import { BookItem } from '../BookItem/BookItem';
import styles from './BookList.module.scss';

export const BookList = () => {
  const state = useTypedSelector((state) => state.book.items);
  
  return (
    <>
      {' '}
      {state.length ? (
        <>
          {' '}
          <h1>Всего книг было куплено  {state.length}</h1>
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
        </>
      ) : (
        <h1>Список книг пуст</h1>
      )}
    </>
  );
};
