import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import BooksList from './BooksList';
import BookSearch from './BookSearch';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BooksList} />
        <Route path="/search" component={BookSearch} />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(BooksApp);