// src/components/TodoForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && startDate) {
      addTodo(value, startDate);
      setValue('');
      setStartDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          type="text"
          id="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="validate"
          placeholder="What is the task today?"
        />
      </div>
      <div className="input-field">
        <input
          type="date"
          id="todo-start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="validate"
          placeholder="Start Date"
        />
      </div>
      <button type="submit" className="btn waves-effect waves-light">
        Add Task
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
