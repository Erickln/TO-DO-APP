// src/components/TodoWrapper.js
import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm';

/**
 * TodoWrapper Component
 * 
 * This component manages the state of the TODO list, including adding, editing,
 * deleting, marking tasks as done or undone, and storing them in local storage.
 */
export const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return savedTodos.map(todo => ({
      ...todo,
      startDate: todo.startDate || new Date().toISOString().split('T')[0], // Default start date if missing
    }));
  });

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new task
  const addTodo = (task, startDate) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: task, startDate: startDate, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
  };

  // Delete a task
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Toggle the completion status of a task
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Toggle the editing state of a task
  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

  // Edit the details of a task
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: task.task, startDate: task.startDate, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

  // Mark a task as done and move it to the end of the list
  const markAsDone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: true, doneDate: new Date().toISOString().split('T')[0] }
        : todo
    );

    // Move the completed task to the end
    const doneTask = newTodos.find(todo => todo.id === id);
    const otherTasks = newTodos.filter(todo => todo.id !== id);
    setTodos([...otherTasks, doneTask]);
  };

  // Mark a task as undone and keep it in its original position
  const markAsUndone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: false, doneDate: null }
        : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="section">
      <TodoForm addTodo={addTodo} />
      <div className="row">
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
            />
          )
        )}
      </div>
    </div>
  );
};
