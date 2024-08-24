// src/components/EditTodoForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          type="text"
          id={`edit-todo-${task.id}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="validate"
        />
        <label htmlFor={`edit-todo-${task.id}`} className="active">
          Update task
        </label>
      </div>
      <button type="submit" className="btn waves-effect waves-light">
        Save
      </button>
    </form>
  );
};

EditTodoForm.propTypes = {
  editTodo: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
  }).isRequired,
};
