import './App.scss';

import { BookForm } from './components/BookForm/BookForm';
import { BookList } from './components/BookList/BookList';

function App() {
  return (
    <div className="App">
      <BookForm />

      <BookList />
    </div>
  );
}

export default App;
