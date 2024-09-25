import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { useEffect, useState } from "react";
import BookListItem from "./BookListItem";
const SearchBooks = ({ consumerBooks, updateBookShelf }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (query.trim().length === 0) {
      setBooks([]);
      return;
    }
    BooksAPI.search(query).then((response) => {
      // if (query !== newQuery) {
      //   console.log(`Query changed ${query} ${newQuery}`);
      //   return;
      // }
      if (response.error || response === undefined) {
        setBooks([]);
        return;
      }
      setBooks(response);
    });
  }, [query]);
  const SearchBooks = (newQuery) => {
    setQuery(newQuery);
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
                consumerShelf={
                  consumerBooks.find((b) => b.id === book.id)?.shelf ?? "none"
                }
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
