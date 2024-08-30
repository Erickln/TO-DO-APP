import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * EditTodoForm Component
 *
 * This component allows users to edit an existing TODO task. It includes a textarea
 * for editing the task's description and a date input for changing the start date of the task.
 */
export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task); // Task description state
  const [startDate, setStartDate] = useState(task.startDate); // Task start date state
  const textareaRef = useRef(null); // Reference to the textarea element

  // Adjust the height of the textarea on mount and when the value changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on scrollHeight
  };

  // Handle changes in the textarea
  const handleTextareaChange = (e) => {
    setValue(e.target.value); // Update task description
    adjustTextareaHeight(); // Adjust the textarea height
  };

  // Handle form submission to save the edited task
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    editTodo({ task: value, startDate: startDate }, task.id); // Save edited task details
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaChange}
          className="validate"
          placeholder="Update task"
          style={{
            width: "100%",
            minHeight: "100px",
            boxSizing: "border-box",
            overflow: "hidden",
            fontSize: "1.4rem",
            color: "white",
            backgroundColor: "#1f2a48",
            padding: "10px",
            borderRadius: "8px",
          }}
        />
      </div>
      <div className="input-field">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="validate"
          style={{
            width: "100%",
            fontSize: "1.4rem",
            color: "white",
            backgroundColor: "#1f2a48",
            padding: "10px",
            borderRadius: "8px",
          }}
        />
      </div>
      <button type="submit" className="btn waves-effect waves-light">
        Save
      </button>
    </form>
  );
};

EditTodoForm.propTypes = {
  editTodo: PropTypes.func.isRequired, // Function to edit the task
  task: PropTypes.shape({
    id: PropTypes.string.isRequired, // Task ID
    task: PropTypes.string.isRequired, // Task description
    startDate: PropTypes.string.isRequired, // Start date
  }).isRequired,
};
