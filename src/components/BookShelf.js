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

const BookShelf = ({ isOver, connectDropTarget, children, name }) => {
    const style = isOver ? { background: 'rgba(0,0,0,0.05)'} : {}
    return connectDropTarget(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books" style={style}>
                <ol className="books-grid">
                    {children}
                </ol>
            </div>
        </div>
    )
}
export default DropTarget('book', shelfTarget, collect)(BookShelf);
