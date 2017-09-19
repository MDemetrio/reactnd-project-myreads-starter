import React from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
    beginDrag(props) {
        return props.book;
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        // When dropped on a compatible target, do something
        const dropResult = monitor.getDropResult();
        props.bookShelfUpdate(props.book, dropResult.shelf)
    }
};

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    };
}

const Book = ({ isDragging, connectDragSource, book, bookShelfUpdate }) => {

    const onShelfSelect = (event) => {
        bookShelfUpdate(book, event.target.value);
    };

    return connectDragSource(
        <div className="book" onClick={() => console.log("clicked")}>
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={onShelfSelect}>
                        <option value="none" disabled>Move to...</option>
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