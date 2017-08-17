import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class BookShelves extends Component {
    state = {
        books: []
    }

    componentWillMount() {
        const books = window.localStorage.getItem('books') || '[]';
        this.setState({ books: JSON.parse(books) });
    }

    componentDidMount() {
        BooksAPI.getAll().then((books => {
            this.setState({ books });
            window.localStorage.setItem('books', JSON.stringify(books));
        }))
    }

    render() {
        const wantToReadBooks = this.state.books.filter(x => x.shelf === 'wantToRead');
        const currentlyReadingBooks = this.state.books.filter(x => x.shelf === 'currentlyReading');
        const readBooks = this.state.books.filter(x => x.shelf === 'read');

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf name="Want to Read" books={wantToReadBooks} />
                        <BookShelf name="Read" books={currentlyReadingBooks} />
                        <BookShelf name="Reading" books={readBooks} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search" className="close-search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookShelves;