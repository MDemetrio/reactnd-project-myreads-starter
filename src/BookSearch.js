import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import BookSearchInput from './BookSearchInput';

class BookSearch extends Component {
    state = {
        books: []
    }

    updateQuery = (value) => {
        BooksAPI.search(value, 10).then(books => this.setState({ books }))
    }

    render() {
        return (
            <div className="search-books">
                <BookSearchInput handleQueryUpdate={this.updateQuery} />
                <div className="search-books-results">
                    <BookShelf books={this.state.books} />
                </div>
            </div>
        );
    }
}

export default BookSearch;