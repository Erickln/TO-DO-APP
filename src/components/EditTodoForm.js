// src/components/EditTodoForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [startDate, setStartDate] = useState(task.startDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo({ task: value, startDate: startDate }, task.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="validate"
        />
        <label className="active">Update task</label>
      </div>
      <div className="input-field">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="validate"
        />
        <label className="active">Update start date</label>
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
    completed: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    startDate: PropTypes.string, // No requerido
  }).isRequired,
};
