import "./App.css";
import { useState , useEffect } from "react";
import MainPageHome from "./components/MainPageHome";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import PageNotFound from "./components/PageNotFound";


function App() { 
  const [books , setBooks] =useState([]);
  const [mapOfIdBooks , setMapOfIdBooks] = useState(new Map());
  
  useEffect(() => {
    const getAllBooks = async () => {
      const results = await BooksAPI.getAll();
      setBooks(results);
      // console.log(results);
      setMapOfIdBooks(creatingMapOfIdBooks(results)); 
    };
    getAllBooks();
  } , []);

const creatingMapOfIdBooks =(books) => {
  const mapping = new Map();
  books.map(book => mapping.set(book.id, book));
  return mapping;
 }
 
  const movingBookShelf = (book, to) => {
    let foundedbook = false;
    const movingBooks = books.map((b) => {
      if (b.id === book.id) {
        book.shelf = to;
        foundedbook = true;
        return book;
      }
      return b;
    });
    if (!mapOfIdBooks.has(book.id) && !foundedbook) {
      book.shelf = to;
      movingBooks.push(book);
    }
    setBooks(movingBooks);
    BooksAPI.update(book, to);
  };
  return (
        <Routes className="app">
          <Route path="/search" element={
 <Search movingBookShelf={movingBookShelf} mapOfIdBooks={mapOfIdBooks} />
          } />

         <Route exact path="/" element={
          <MainPageHome books={books} movingBookShelf={movingBookShelf} />
         }/>
         <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}

export default App;
