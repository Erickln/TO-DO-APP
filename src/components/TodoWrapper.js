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
      startDate: todo.startDate || new Date().toISOString().split('T')[0] // Valor predeterminado si falta
    }));
  });
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task, startDate) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: task, startDate: startDate, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: task.task, startDate: task.startDate, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

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

  const markAsUndone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: false, doneDate: null }
        : todo
    );

    // Move the undone task back to its original position
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
