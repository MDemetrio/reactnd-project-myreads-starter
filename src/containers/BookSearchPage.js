import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from '../components/BookShelf';
import BookSearchInput from '../components/BookSearchInput';
import Book from '../components/Book';

class BookSearchPage extends Component {
    state = {
        searchResults: [],
        query: ""
    }

    updateQuery = (query) => {
        BooksAPI.search(query, 10).then((results) => {
            Array.isArray(results) && results.forEach(b => {
                const x = this.props.myBooks.find(x => x.id === b.id);
                if (x)
                    b.shelf = x.shelf;
                else
                    b.shelf = 'none'
            })
            this.setState({ searchResults: results, query })
        })
    }

    updateBook = (book, shelf) => {
        this.props.handleUpdate(book, shelf);
        this.setState((prevState) => {
            prevState.searchResults.find(b => b.id === book.id).shelf = shelf;
            return { searchResults: prevState.searchResults }
        })
    }

    render() {
        return (
            <div className="search-books">
                <BookSearchInput handleQueryUpdate={this.updateQuery} />
                <div className="search-books-results">
                    <BookShelf name={this.state.query ? `Search Results for ${this.state.query}` : "Search Results"}>
                        {Array.isArray(this.state.searchResults) && this.state.searchResults.map(book =>
                            <li key={book.id}>
                                <Book book={book} bookShelfUpdate={this.updateBook} />
                            </li>
                        )}
                    </BookShelf>
                </div>
            </div>
        );
    }
}

export default BookSearchPage;