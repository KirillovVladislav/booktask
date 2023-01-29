import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookItem {
  id: string;
  title: string;
  author: string;
  image: string;
}

interface BookState {
  items: BookItem[];
}

const initialState: BookState = {
  items: [],
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookItem>) => {
      state.items.push({
        ...action.payload,
      });
    },
    removeBook: (state, action: PayloadAction<{ id: string }>) => {
      const newItems = state.items.filter((item) => item.id !== action.payload.id);

      return { ...state, items: newItems };
    },
    updateBook: (state, action: PayloadAction<BookItem>) => {
      const updatedBook = state.items.map((book) => {
        if (book.id === action.payload.id) {
          return action.payload;
        }
        return book;
      });
      return { ...state, items: updatedBook };
    },
  },
});

export const bookReducer = slice.reducer;
export const bookActions = slice.actions;
