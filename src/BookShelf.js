import React from 'react';
import Book from './Book';

const BookShelf = ({ books, name = "" }) => {
    return (
        <div className="bookshelf">
            {name && <h2 className="bookshelf-title">{name}</h2>}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book =>
                        <li key={book.id}>
                            <Book coverUrl={book.imageLinks.thumbnail} name={book.title} authors={book.authors} />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;