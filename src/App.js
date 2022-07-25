import "./App.css";
import { useState , useEffect } from "react";
import MainPageHome from "./components/MainPageHome";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";


function App() { 
  const [books , setBooks] =useState([]);
  const [mapOfIdBooks , setMapOfIdBooks] = useState(new Map());
  
  const creatingMapOfIdBooks =(books) => {
    const mapping = new Map();
    books.map(book => mapping.set(book.id, book));
    return mapping;
   }
   useEffect(() => {
BooksAPI.getAll()
.then(data => {
  setBooks(data);
  setMapOfIdBooks(creatingMapOfIdBooks(data)); 
})} , []);


  const movingBookShelf = (book , to) => {
    const movingBooks = books.map(b => {
if(b.id === book.id){
  book.shelf = to;
  return book;
}
return b;
    })
    if(!mapOfIdBooks.has(book.id)){
      book.shelf = to;
      movingBooks.push(book);
    }
    setBooks(movingBooks);
    BooksAPI.update(book,to);
  }

  return (
        <Routes className="app">
          <Route path="/search" element={
 <Search movingBookShelf={movingBookShelf} mapOfIdBooks={mapOfIdBooks} />
          } />

         <Route exact path="/" element={
          <MainPageHome books={books} movingBookShelf={movingBookShelf} />
         }/>
      </Routes>
  );
}

export default App;
