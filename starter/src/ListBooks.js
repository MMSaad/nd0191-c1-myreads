import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
const ListBooks = () => {
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
      console.log(books);
      setBooks(books);
    });
  }, []);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => {
            return (
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter((book) => book.shelf === shelf.value)
                      .map((book) => {
                        return (
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                                  }}
                                ></div>
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="none" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.authors.join(", ")}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
