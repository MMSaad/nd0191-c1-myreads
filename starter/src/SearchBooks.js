import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { useState } from "react";
import BookListItem from "./BookListItem";
const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const updateBookShelf = (book, shelf) => {
    //Call API to update the book shelf
    BooksAPI.update(book, shelf).then((response) => {
      console.log(response);
      const newBooks = books.map((b) => {
        if (response.currentlyReading.includes(b.id)) {
          b.shelf = "currentlyReading";
        } else if (response.wantToRead.includes(b.id)) {
          b.shelf = "wantToRead";
        } else if (response.read.includes(b.id)) {
          b.shelf = "read";
        } else {
          b.shelf = "none";
        }
        return b;
      });
      setBooks(newBooks);
    });
  };
  const SearchBooks = (newQuery) => {
    setQuery(newQuery);
    console.log(newQuery);
    if (newQuery.trim().length === 0) {
      setBooks([]);
      return;
    }
    BooksAPI.search(newQuery).then((response) => {
      console.log(response);
      if (query !== newQuery) {
        console.log(`Query changed ${query} `);
        return;
      }
      if (response.error) {
        setBooks([]);
        return;
      }
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
              <BookListItem
                key={book.id}
                book={book}
                updateBookShelf={updateBookShelf}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
