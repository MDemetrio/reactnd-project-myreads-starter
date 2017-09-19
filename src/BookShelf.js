import React from 'react';
import Book from './Book';
import { DropTarget } from 'react-dnd';

const shelfTarget = {
    drop(props) {
        return { shelf: props.shelf }
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

const BookShelf = ({ connectDropTarget, books, handleShelfUpdate, shelf }) => {
    const renderBook = book => {
        return <Book book={book} bookShelfUpdate={handleShelfUpdate} />;
    }

    let name;
    switch (shelf) {
        case 'wantToRead':
            name = "Want to Read";
            break;
        case "currentlyReading":
            name = "Currently Reading";
            break;            
        case "read":
            name = "Read";
            break;            
        default:
            break;
    }

    return connectDropTarget(
        <div className="bookshelf">
            {shelf && <h2 className="bookshelf-title">{name}</h2>}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book =>
                        <li key={book.id}>
                            {renderBook(book)}
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}
export default DropTarget('book', shelfTarget, collect)(BookShelf);
