import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../components/BookShelf';
import Book from '../components/Book';

const BooksListPage = ({myBooks, handleUpdate}) => {

    const renderShelf = ({ shelf, name }) => {
        const filteredBooks = myBooks.filter(x => x.shelf === shelf);
        return (
            <BookShelf shelf={shelf} name={name}>
                {filteredBooks.map(book =>
                    <li key={book.id}>
                        <Book book={book} bookShelfUpdate={handleUpdate} />
                    </li>
                )}
            </BookShelf>
        )
    }
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {renderShelf({ shelf: "wantToRead", name: "Want to Read" })}
                    {renderShelf({ shelf: "read", name: "Read" })}
                    {renderShelf({ shelf: "currentlyReading", name: "Currently Reading" })}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search" className="close-search">Add a book</Link>
            </div>
        </div>
    );

}

export default BooksListPage;