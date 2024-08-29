import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Todo Component
 * 
 * Displays an individual todo task, with options to edit, delete, mark as done/undone,
 * and drag-and-drop reordering.
 */
export const Todo = ({
  task,
  deleteTodo,
  editTodo,
  markAsDone,
  markAsUndone,
  onDragStart,
  onDragOver,
  onDrop,
}) => {

  // Handle the double-click event to toggle done/undone and update the doneDate
  const handleDoubleClick = () => {
    if (task.completed) {
      markAsUndone(task.id);
    } else {
      markAsDone(task.id);
    }
  };

  // Prevent event propagation when clicking buttons
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevents click events from bubbling up to parent elements
  };

  /* The Todo component now includes a double-click event handler to toggle the completion status of a task.*/
  return (
    <div
      className={`card ${task.completed ? 'blue-grey darken-1' : 'blue accent-2'}`}
      style={{ position: 'relative', cursor: 'move' }}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, task.id)}
      onDoubleClick={handleDoubleClick} // Reintroducing double-click event
    >
      <div className="card-content white-text">
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex' }}>
          {task.completed ? (
            <button className="btn-flat" onClick={(e) => { handleButtonClick(e); markAsUndone(task.id); }} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faUndo} />
            </button>
          ) : (
            <button className="btn-flat" onClick={(e) => { handleButtonClick(e); markAsDone(task.id); }} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          )}
          <button className="btn-flat" onClick={(e) => { handleButtonClick(e); editTodo(task.id); }} style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button className="btn-flat" onClick={(e) => { handleButtonClick(e); deleteTodo(task.id); }} style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <p
          className={task.completed ? 'completed' : 'incompleted'}
          style={{ marginRight: 'auto' }}
        >
          {task.task}
        </p>
        <p className="date-text">Start Date: {task.startDate}</p>
        {task.completed && <p className="date-text">Done Date: {task.doneDate}</p>}
      </div>
    </div>
  );
};

Todo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    startDate: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  markAsDone: PropTypes.func.isRequired,
  markAsUndone: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};
