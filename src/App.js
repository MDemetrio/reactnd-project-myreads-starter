import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
    state = {

    }

    render() {
      return (
        <div className="app">
          <Route exact path="/" component={BookShelves}/>
          <Route path="/search" component={BookSearch}/>

        </div>
      )
    }
  }

export default BooksApp
