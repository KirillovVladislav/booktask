import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { AiOutlineFileImage } from 'react-icons/ai';

import { useActions } from '../../hooks/useActions';
import styles from './BookForm.module.scss';

const DEFAULT_TODO = { author: '', title: '', image: '' };

export const BookForm = () => {
  const [book, setBook] = useState(DEFAULT_TODO);
  const { addBook } = useActions();

  const convertBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBook({ ...book, image: reader.result ? reader.result.toString() : '' });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!book.title || !book.author) {
      return;
    }

    addBook({
      ...book,
      id: nanoid(),
    });
    setBook({ ...book, author: '', title: '', image: '' });
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <h3>Добавить книгу</h3>
        <div className={styles.author}>
          <label htmlFor="author">Автор:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
        </div>
        <div className={styles.title}>
          <label htmlFor="title">Название:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
          />
        </div>
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            width={'145px'}
            height={'205px'}
            className={styles.imgForm}
          />
        ) : (
          <div>
            <input
              type="file"
              name=""
              id="fileUpload"
              className="hidden"
              onChange={(e) => convertBase64(e)}
            />
            <label htmlFor="fileUpload">
              <AiOutlineFileImage />
            </label>
          </div>
        )}

        <button className={styles.formBtn} type="submit">
          Добавить книгу
        </button>
      </form>
    </div>
  );
};
