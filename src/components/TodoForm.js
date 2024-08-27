// src/components/TodoForm.js
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * TodoForm Component
 * 
 * This component allows users to add a new TODO task. It includes a textarea for
 * task description and a date input for setting the start date.
 */
export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today's date
  const textareaRef = useRef(null);

  // Handle form submission to add a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && startDate) {
      addTodo(value, startDate); // Add task with provided details
      setValue(''); // Reset task description
      setStartDate(new Date().toISOString().split('T')[0]); // Reset start date to today
    } else {
      console.log("Both task and start date are required.");
    }
  };

  // Handle changes in the textarea
  const handleTextareaChange = (e) => {
    setValue(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <textarea
          ref={textareaRef}
          id="todo-input"
          value={value}
          onChange={handleTextareaChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)} // Submit on Enter key press
          className="validate"
          placeholder="What is the task today?"
          style={{
            width: '100%',
            minHeight: '100px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            fontSize: '1.4rem',
            color: 'white',
            backgroundColor: '#1f2a48',
            padding: '10px',
            borderRadius: '8px',
          }}
        />
        <label htmlFor="todo-input" className="active">Task Description</label>
      </div>
      <div className="input-field" style={{ marginBottom: '20px' }}>
        <input
          type="date"
          id="todo-start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="validate"
          style={{
            width: '100%',
            fontSize: '1.4rem',
            color: 'white',
            backgroundColor: '#1f2a48',
            padding: '10px',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
        />
        <label htmlFor="todo-start-date" className="active">Start Date</label>
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
