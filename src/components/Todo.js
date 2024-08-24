// src/components/Todo.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="card">
      <div className="card-content white-text">
        <div className="task-header">
          <p
            className={task.completed ? 'completed' : 'incompleted'}
            onClick={() => toggleComplete(task.id)}
          >
            {task.task}
          </p>
          <div className="icons">
            <button className="btn-flat" onClick={() => editTodo(task.id)}>
              <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#ffffff' }} />
            </button>
            <button className="btn-flat" onClick={() => deleteTodo(task.id)}>
              <FontAwesomeIcon icon={faTrash} style={{ color: '#ffffff' }} />
            </button>
          </div>
        </div>
        <p>Start Date: {task.startDate}</p>
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
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};
