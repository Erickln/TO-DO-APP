// src/components/TodoWrapper.js

import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return savedTodos.map(todo => ({
      ...todo,
      startDate: todo.startDate || new Date().toISOString().split('T')[0], // Default start date if missing
    }));
  });
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new task
  const addTodo = (task, startDate) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: task, startDate: startDate, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
  };

  // Function to delete a task
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Function to toggle the completion status of a task
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Function to toggle the edit mode of a task
  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

  // Function to edit the details of a task
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: task.task, startDate: task.startDate, isEditing: false } : todo
    );
    setTodos(newTodos);
  };

  // Function to mark a task as done and set the done date
  const markAsDone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: true, doneDate: new Date().toISOString().split('T')[0] }
        : todo
    );
    setTodos(newTodos);
  };

  // Function to mark a task as undone and clear the done date
  const markAsUndone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: false, doneDate: null }
        : todo
    );
    setTodos(newTodos);
  };

  // Function to cancel all edit modes when clicking outside
  const cancelAllEdits = () => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      isEditing: false,
    }));
    setTodos(newTodos);
  };

  // Default no-op functions for drag and drop
  const handleDragStart = () => {};
  const handleDragOver = () => {};
  const handleDragLeave = () => {};
  const handleDrop = () => {};

  return (
    <div className="section" onClick={cancelAllEdits} style={{ cursor: 'default' }}>
      <TodoForm addTodo={addTodo} />
      <div className="row" onClick={(e) => e.stopPropagation()}>
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
              markAsDone={markAsDone}
              markAsUndone={markAsUndone}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              isHovered={false} // Provide a default value for isHovered
            />
          )
        )}
      </div>
    </div>
  );
};
