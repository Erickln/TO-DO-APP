// src/components/Todo.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Todo component: Displays a task card with various actions
export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, markAsDone, markAsUndone }) => {
  return (
    // Card container with dynamic class based on task completion status
    <div className={`card ${task.completed ? 'blue-grey darken-1' : 'blue accent-2'}`} style={{ position: 'relative' }}>
      <div className="card-content white-text">
        {/* Action buttons container */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex' }}>
          {/* Conditional rendering of mark as done/undone button */}
          {task.completed ? (
            <button className="btn-flat" onClick={() => markAsUndone(task.id)} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faUndo} />
            </button>
          ) : (
            <button className="btn-flat" onClick={() => markAsDone(task.id)} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          )}
          {/* Edit task button */}
          <button className="btn-flat" onClick={() => editTodo(task.id)} style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          {/* Delete task button */}
          <button className="btn-flat" onClick={() => deleteTodo(task.id)} style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {/* Task description with toggle complete on click */}
        <p
          className={task.completed ? 'completed' : 'incompleted'}
          onClick={() => toggleComplete(task.id)}
          style={{ marginRight: 'auto' }}
        >
          {task.task}
        </p>
        {/* Display start date of the task */}
        <p className="date-text">Start Date: {task.startDate}</p>
        {/* Conditional rendering of done date if task is completed */}
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
    doneDate: PropTypes.string, // Optional done date
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  markAsDone: PropTypes.func.isRequired,
  markAsUndone: PropTypes.func.isRequired,
};
