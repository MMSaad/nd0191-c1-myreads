import BookListItem from "./BookListItem";
const BookShelf = ({ shelf, books, onShelfChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <BookListItem
                key={book.id}
                book={book}
                updateBookShelf={onShelfChange}
                consumerShelf={book.shelf}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
