import React from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

const BookShelf = ({ books, name = "" }) => {
    function handleUpdate (book, shelf) {
        console.log(shelf);
        BooksAPI.update(book,shelf)
    }

    return (
        <div className="bookshelf">
            {name && <h2 className="bookshelf-title">{name}</h2>}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book =>
                        <li key={book.id}>
                            <Book onUpdate={(shelf) => handleUpdate(book, shelf)} coverUrl={book.imageLinks.thumbnail} name={book.title} authors={book.authors} />
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;