import { Link } from "react-router-dom";

const BookListItem = ({ book, updateBookShelf, consumerShelf }) => {
  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks?.smallThumbnail}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={consumerShelf}
              onChange={(event) => {
                updateBookShelf(book, event.target.value);
              }}
            >
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <Link to={`/details/${book.id}`} className="book-title">
          {book.title}
        </Link>
        <div className="book-authors">{book.authors?.join(", ")}</div>
      </div>
    </li>
  );
};

export default BookListItem;
