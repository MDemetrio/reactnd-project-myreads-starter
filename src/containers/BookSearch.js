import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from '../components/BookShelf';
import BookSearchInput from '../components/BookSearchInput';
import Book from '../components/Book';

class BookSearch extends Component {
    state = {
        books: []
    }

    handleUpdate = (book, shelf) => {
        BooksAPI.update(book, shelf)
    }

    updateQuery = (value) => {
        BooksAPI.search(value, 10).then(
            books => this.setState({ books })
        )
    }

    render() {
        return (
            <div className="search-books">
                <BookSearchInput handleQueryUpdate={this.updateQuery} />
                <div className="search-books-results">
                    <BookShelf name="Search Results:">
                        {this.state.books.map(book =>
                            <li key={book.id}>
                                <Book {...book} bookShelfUpdate={this.handleUpdate} />
                            </li>
                        )}
                    </BookShelf>
                </div>
            </div>
        );
    }
}

export default BookSearch;