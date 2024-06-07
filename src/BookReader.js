import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './BookReader.css';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author
      pages {
        content
      }
    }
  }
`;

const BookReader = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data.books[currentBookIndex];
  const pageLeft = book.pages[currentPageIndex] || { content: '' };
  const pageRight = book.pages[currentPageIndex + 1] || { content: '' };

  const handleNextPage = () => {
    if (currentPageIndex < book.pages.length - 2) {
      setCurrentPageIndex(currentPageIndex + 2);
    } else if (currentBookIndex < data.books.length - 1) {
      setCurrentBookIndex(currentBookIndex + 1);
      setCurrentPageIndex(0);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 2);
    } else if (currentBookIndex > 0) {
      setCurrentBookIndex(currentBookIndex - 1);
      setCurrentPageIndex(data.books[currentBookIndex - 1].pages.length - 2);
    }
  };

  return (
    <div className="book-reader">
      <h2>{book.title} by {book.author}</h2>
      <div className="book">
        <div className="page left">
          <p>{pageLeft.content}</p>
        </div>
        <div className="page right">
          <p>{pageRight.content}</p>
        </div>
      </div>
      <div className="navigation">
        <button onClick={handlePrevPage} disabled={currentBookIndex === 0 && currentPageIndex === 0}>Previous</button>
        <button onClick={handleNextPage} disabled={currentBookIndex === data.books.length - 1 && currentPageIndex >= book.pages.length - 2}>Next</button>
      </div>
    </div>
  );
};

export default BookReader;
