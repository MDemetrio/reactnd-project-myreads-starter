import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

const BookShelf = ({ name, books }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
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

const Book = ({ coverUrl, title, authors }) => {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
                <div className="book-shelf-changer">
                    <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    );
}

class BookShelves extends Component {
    state = {
        books: []
    }
    componentDidMount(){
        BooksAPI.getAll().then((books => this.setState({books})))
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
                        <BookShelf name="Read" books={currentlyReadingBooks}/>
                        <BookShelf name="Reading" books={readBooks}/>
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