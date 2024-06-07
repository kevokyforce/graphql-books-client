import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './App.css';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      pages {
        pageIndex
        content
        tokens {
          value
          position
        }
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [currentPage, setCurrentPage] = useState(0);
// Loader
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const book = data.books[0]; // Displaying our  first book

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      // Calculate the index of the next double page
      const nextPageIndex = (prevPage + 2) % book.pages.length;
      
      // If nextPageIndex is 0, set it to the last page index to avoid skipping pages
      return nextPageIndex === 0 ? book.pages.length - 1 : nextPageIndex;
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      // Calculating the index of Our previous page
      const prevPageIndex = Math.max(0, prevPage - 2);
      return prevPageIndex;
    });
  };

  return (
    <div className="book-container">
      <h1 className="book-title">{book.title}</h1>
      <h2 className="book-author">{book.author}</h2>
      <div className="pages-container">
        <div className="page">
          <h3>Page {currentPage + 1}</h3>
          <p>{book.pages[currentPage]?.content || ' '}</p>
        </div>
        <div className="page">
          <h3>Page {currentPage + 2}</h3>
          <p>{book.pages[currentPage + 1]?.content || ' '}</p>
        </div>
        {book.pages[currentPage + 2] && ( 
          <div className="page">
            <h3>Page {currentPage + 3}</h3>
            <p>{book.pages[currentPage + 2]?.content}</p>
          </div>
        )}
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handlePreviousPage}>Back</button>
        <button className="next-button" onClick={handleNextPage}>Next Double Page</button>
      </div>
    </div>
  );
};

export default App;
