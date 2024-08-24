// src/components/Todo.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="card blue accent-2">
      <div className="card-content white-text">
        <p
          className={task.completed ? 'completed' : 'incompleted'}
          onClick={() => toggleComplete(task.id)}
        >
          {task.task}
        </p>
        <p>Start Date: {task.startDate}</p>
      </div>
      <div className="card-action">
        <button className="btn-flat" onClick={() => editTodo(task.id)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className="btn-flat" onClick={() => deleteTodo(task.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
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
