// src/components/TodoForm.js
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && startDate) {
      addTodo(value, startDate);
      setValue('');
      setStartDate(new Date().toISOString().split('T')[0]);
    } else {
      console.log("Both task and start date are required.");
    }
  };

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
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          className="validate"
          placeholder="What is the task today?"
          style={{
            width: '100%',
            minHeight: '100px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            fontSize: '1.4rem',
            color: 'white',
          }}
        />
      </div>
      <div className="input-field">
        <input
          type="date"
          id="todo-start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="validate"
          style={{ width: '100%',
            fontSize: '1.4rem',
            color: 'white',
           }}
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
