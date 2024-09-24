import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
const BookDetails = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    BooksAPI.get(id).then((book) => {
      setBook(book);
    });
  }, [id]);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          onClick={() => {
            navigate(-1);
          }}
          className="close-search"
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <div>{book.title}</div>
        </div>
      </div>
      <div className="book-details">
        <div className="image-container">
          <img src={book.imageLinks?.thumbnail} alt={book.title} />
        </div>
        <div className="book-details-info">
          <div className="book-detail-row">
            <strong>Authors</strong>
            {book.authors?.join(", ")}
          </div>
          <div className="book-detail-row">
            <strong>Rating</strong>
            {book.averageRating}
          </div>
          <div className="book-detail-row">
            <strong>Categories</strong>
            {book.categories?.join(", ")}
          </div>
          <div className="book-detail-row">
            <strong>Description</strong>
            {book.description}
          </div>
          <div className="book-detail-row">
            <strong>Language</strong>
            {book.language}
          </div>
          <div className="book-detail-row">
            <strong>Pages</strong>
            {book.pageCount}
          </div>
          <div className="book-detail-row">
            <strong>Publish Date</strong>
            {book.publishedDate}
          </div>
          {book.industryIdentifiers?.map((identifier) => {
            return (
              <div key={identifier.type} className="book-detail-row">
                <strong>{identifier.type}</strong>
                {identifier.identifier}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
