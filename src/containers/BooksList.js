import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookShelf from '../components/BookShelf';
import Book from '../components/Book';

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

    handleUpdate = (book, shelf) => {
        const booksCopy = Object.assign([], this.state.books);
        booksCopy[booksCopy.findIndex(b => b.id === book.id)].shelf = shelf;
        BooksAPI.update(book, shelf).then(() => {
            this.setState({ books: booksCopy })
        })
    }

    renderShelf = ({ shelf, name }) => {
        const books = this.state.books.filter(x => x.shelf === shelf);
        return (
            <BookShelf shelf={shelf} name={name}>
                {books.map(book =>
                    <li key={book.id}>
                        <Book {...book} bookShelfUpdate={this.handleUpdate} />
                    </li>
                )}
            </BookShelf>
        )
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.renderShelf({ shelf: "wantToRead", name: "Want to Read" })}
                        {this.renderShelf({ shelf: "read", name: "Read" })}
                        {this.renderShelf({ shelf: "currentlyReading", name: "Currently Reading" })}
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