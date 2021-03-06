import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import BooksListPage from './BooksListPage';
import BookSearchPage from './BookSearchPage';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as BooksAPI from '../BooksAPI';

function sortBooks(books) {
  return books.sort((a, b) => {
    var nameA = a.title.toUpperCase();
    var nameB = b.title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

class BooksApp extends React.Component {

  //  ES7 Property Initializers method
  //  state = {
  //    myBooks: []
  //  }

  //  Keeping with Constructor method, since it's recomended by react docs
  constructor(props) {
    super(props);
    this.state = {
      myBooks: []
    };
  }

  componentWillMount() {
    const books = window.localStorage.getItem('books') || '[]';
    this.setState({ myBooks: JSON.parse(books) });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books => {
      this.setState({ myBooks: sortBooks(books) });
      this.setStorage();
    }))
  }
  
  //TODO: Study service workers to implement real offline experience 
  //https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c
  setStorage = () => {
    window.localStorage.setItem('books', JSON.stringify(this.state.myBooks));
  }

  handleUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then((booksIds) => {
      book.shelf = shelf;

      this.setState(({ myBooks }) => {
        const index = myBooks.findIndex(b => b.id === book.id);
        if (index !== -1)
          myBooks[index] = book;
        else
          myBooks.push(book);

        return { myBooks }
      })
      this.setStorage();
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BooksListPage myBooks={this.state.myBooks} handleUpdate={this.handleUpdate} />} />
        <Route path="/search" render={() => <BookSearchPage myBooks={this.state.myBooks} handleUpdate={this.handleUpdate} />} />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(BooksApp);