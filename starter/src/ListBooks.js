import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
const ListBooks = ({ books, shelves, updateBookShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => {
            return (
              <BookShelf
                key={shelf.value}
                shelf={shelf}
                books={books.filter((book) => book.shelf === shelf.value)}
                onShelfChange={updateBookShelf}
              />
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
