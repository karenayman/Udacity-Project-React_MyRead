import { Link } from "react-router-dom";
import Book from "./Book";
import { useState , useEffect } from "react";
import QueryUsing from "../hook/QueryUsing";




const Search =({movingBookShelf , mapOfIdBooks}) => {
    const [query , setQuery] =useState("");
    const [combinedBook , setCombinedBook] = useState([]);
    const [bookSearch ,setBookSearch] = QueryUsing(query);

    useEffect(() => {
        const compineBook = bookSearch.map(book =>{
          if(mapOfIdBooks.has(book.id)){
            return mapOfIdBooks.get(book.id);
          }else{
            return book;
          }
        })
        setCombinedBook(compineBook);
      } ,[bookSearch]);
return (
<div className="search-books">
 <div className="search-books-bar">
   <Link to="/"  className="close-search" onClick={() => window.reload()}>Close</Link>
   <div className="search-books-input-wrapper">
     <input
       type="text"
       placeholder="Search by title, author, or ISBN"
       value={query}
       onChange={(e) => setQuery(e.target.value)}
     />
   </div>
 </div>
 <div className="search-books-results">
   <ol className="books-grid">
   {combinedBook.map(book => (
   <li key={book.id} >
    <Book book={book} changeShelf={movingBookShelf} />
   </li>
   ))}
   </ol>
 </div>
</div>
)
}
export default Search;