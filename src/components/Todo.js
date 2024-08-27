// src/components/Todo.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, markAsDone, markAsUndone, onDragStart, onDragOver, onDragLeave, onDrop, isHovered }) => {
  return (
    <div
      className={`card ${task.completed ? 'blue-grey darken-1' : 'blue accent-2'} ${isHovered ? 'card-over' : ''}`}
      style={{ position: 'relative', cursor: 'move' }}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="card-content white-text">
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex' }}>
          {task.completed ? (
            <button className="btn-flat" onClick={() => markAsUndone(task.id)} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faUndo} />
            </button>
          ) : (
            <button className="btn-flat" onClick={() => markAsDone(task.id)} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          )}
          <button className="btn-flat" onClick={() => editTodo(task.id)} style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button className="btn-flat" onClick={() => deleteTodo(task.id)} style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <p
          className={task.completed ? 'completed' : 'incompleted'}
          onClick={() => toggleComplete(task.id)}
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
  toggleComplete: PropTypes.func.isRequired,
  markAsDone: PropTypes.func.isRequired,
  markAsUndone: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
};
