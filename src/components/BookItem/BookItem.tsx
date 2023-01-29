import { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineFileImage } from 'react-icons/ai';

import { useActions } from '../../hooks/useActions';
import styles from './BookItem.module.scss';

interface BookItemProps {
  author: string;
  title: string;
  image: string;
  id: string;
}

export const BookItem = ({ author, title, image, id }: BookItemProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editBook, setEditBook] = useState({
    author: author,
    title: title,
    image: image,
  });
  const { removeBook, updateBook } = useActions();

  const convertBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditBook({ ...editBook, image: reader.result ? reader.result.toString() : '' });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();

    updateBook({ ...editBook, id });
    setIsEdit(false);
  };

  console.log(editBook);
  return isEdit ? (
    <form onSubmit={handleSubmitEdit}>
      <h3>Изменить книгу</h3>
      <div className={styles.author}>
        <label htmlFor="author">Автор:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={editBook.author}
          onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
        />
      </div>
      <div className={styles.title}>
        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={editBook.title}
          onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
        />
      </div>

      <img
        src={editBook.image}
        alt={editBook.title}
        width={'145px'}
        height={'205px'}
        className={styles.imgForm}
      />

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

      <button className={styles.formBtn} type="submit">
        Изменить книгу
      </button>
    </form>
  ) : (
    <div className={styles.card}>
      <span>Автор: {author}</span>
      <span>Название: {title}</span>
      <img src={image} alt={title} width={'145px'} height={'205px'} />
      <div className={styles.btns}>
        <AiFillEdit onClick={() => setIsEdit(true)} />
        <AiFillDelete onClick={() => removeBook({ id: id })} />
      </div>
    </div>
  );
};
