// src/components/Todo.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Todo Component
 * 
 * This component represents a single task in the Todo list. It provides functionalities
 * to edit, delete, mark as done/undone, and drag-and-drop reordering of tasks.
 */
export const Todo = ({ task, deleteTodo, editTodo, markAsDone, markAsUndone, onDragStart, onDragOver, onDragLeave, onDrop, isHovered }) => {

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

  return (
    <div
      className={`card ${task.completed ? 'blue-grey darken-1' : 'blue accent-2'} ${isHovered ? 'card-over' : ''}`}
      style={{ position: 'relative', cursor: 'move' }}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDoubleClick={handleDoubleClick} // Add double-click event to the entire card
    >
      <div className="card-content white-text">
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex' }}>
          {task.completed ? (
            <button
              className="btn-flat"
              onClick={(e) => {
                handleButtonClick(e);
                markAsUndone(task.id);
              }}
              style={{ marginLeft: '10px' }}
            >
              <FontAwesomeIcon icon={faUndo} />
            </button>
          ) : (
            <button
              className="btn-flat"
              onClick={(e) => {
                handleButtonClick(e);
                markAsDone(task.id);
              }}
              style={{ marginLeft: '10px' }}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          )}
          <button
            className="btn-flat"
            onClick={(e) => {
              handleButtonClick(e);
              editTodo(task.id);
            }}
            style={{ marginLeft: '10px' }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            className="btn-flat"
            onClick={(e) => {
              handleButtonClick(e);
              deleteTodo(task.id);
            }}
            style={{ marginLeft: '10px' }}
          >
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
  deleteTodo: PropTypes.func.isRequired, // Function to delete the task
  editTodo: PropTypes.func.isRequired, // Function to toggle the edit mode
  markAsDone: PropTypes.func.isRequired, // Function to mark the task as done
  markAsUndone: PropTypes.func.isRequired, // Function to mark the task as undone
  onDragStart: PropTypes.func.isRequired, // Function to handle drag start
  onDragOver: PropTypes.func.isRequired, // Function to handle drag over
  onDragLeave: PropTypes.func.isRequired, // Function to handle drag leave
  onDrop: PropTypes.func.isRequired, // Function to handle drop
  isHovered: PropTypes.bool.isRequired, // Boolean to determine if the task is being hovered
};
