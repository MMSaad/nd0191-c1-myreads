import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { useState } from "react";
const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const SearchBooks = (query) => {
    console.log(query);
    BooksAPI.search(query).then((response) => {
      console.log(response);
      setBooks(response);
    });
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(event) => {
              SearchBooks(event.target.value);
            }}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <h1>{book.title}</h1>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
