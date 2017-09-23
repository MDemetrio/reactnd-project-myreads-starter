import React from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
    beginDrag(book) {
        return book;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        const dropResult = monitor.getDropResult();
        props.bookShelfUpdate(props.book, dropResult.shelf)
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const Book = ({ isDragging, connectDragSource, bookShelfUpdate, book }) => {
    const style = isDragging ? { border: '2px solid #ABE7D3'} : {}    
    return connectDragSource(
        <div className="book">
            <div className="book-top">
                {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`, ...style }} />}
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => bookShelfUpdate(book, event.target.value)}>
                        <option value="" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
}


export default DragSource('book', cardSource, collect)(Book);