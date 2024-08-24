// src/components/TodoForm.js
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState(() => {
    // Inicializa con la fecha actual en formato YYYY-MM-DD
    return new Date().toISOString().split('T')[0];
  });
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && startDate) {
      addTodo(value, startDate);
      setValue('');
      setStartDate(new Date().toISOString().split('T')[0]); // Restablece la fecha a la actual después de enviar
      console.log(value, startDate);
    } else {
      console.log("Both task and start date are required.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita que la tecla Enter añada un salto de línea en el textarea
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setValue(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <textarea
          ref={textareaRef}
          id="todo-input"
          value={value}
          onChange={handleTextareaChange}
          onKeyPress={handleKeyPress} // Agregar el manejador de tecla
          className="validate"
          placeholder="What is the task today?"
          style={{
            width: '100%',
            minHeight: '100px',
            boxSizing: 'border-box',
            overflow: 'hidden',
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
          style={{ width: '150px' }}
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
