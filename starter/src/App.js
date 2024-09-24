import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import BookDetails from "./BookDetails";

function App() {
  const [books, setBooks] = useState([]);
  const shelves = [
    {
      title: "Currently Reading",
      value: "currentlyReading",
    },
    {
      title: "Want to Read",
      value: "wantToRead",
    },
    {
      title: "Read",
      value: "read",
    },
  ];
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);
  const updateBookShelf = (book, shelf) => {
    //Call API to update the book shelf
    BooksAPI.update(book, shelf).then((response) => {
      const updateBooks = books;
      const bookIndex = updateBooks.findIndex((b) => b.id === book.id);
      if (bookIndex === -1) {
        updateBooks.concat([book]);
      }
      const newBooks = updateBooks.map((b) => {
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

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListBooks
              books={books}
              shelves={shelves}
              updateBookShelf={updateBookShelf}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchBooks
              consumerBooks={books}
              updateBookShelf={updateBookShelf}
            />
          }
        />
        <Route path="/details/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
