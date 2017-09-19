import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves';
import BookSearch from './BookSearch';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

export default DragDropContext(HTML5Backend)(BooksApp);