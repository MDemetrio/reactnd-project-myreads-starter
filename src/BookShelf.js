import React from 'react';
import Book from './Book';

const BookShelf = ({ books, handleShelfUpdate, name = "" }) => {
    const renderBook = book => {
        return <Book book={book} bookShelfUpdate={handleShelfUpdate} currentShelf={book.shelf} />;
      }

    return (
        <div className="bookshelf">
            { name && <h2 className="bookshelf-title">{name}</h2> }
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book =>
                        <li key={book.id}>
                            {renderBook(book)}
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;