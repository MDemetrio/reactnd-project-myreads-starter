import React from 'react';
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

const BookShelf = ({ connectDropTarget, children, name }) => {
    return connectDropTarget(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {children}
                </ol>
            </div>
        </div>
    )
}
export default DropTarget('book', shelfTarget, collect)(BookShelf);
