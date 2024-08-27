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
      todo.id === id ? { ...todo, task: task.task, startDate: task.startDate, isEditing: false } : todo
    );
    setTodos(newTodos);
  };

  const markAsDone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: true, doneDate: new Date().toISOString().split('T')[0] }
        : todo
    );
    setTodos(newTodos);
  };

  const markAsUndone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: false, doneDate: null }
        : todo
    );
    setTodos(newTodos);
  };

  const cancelAllEdits = () => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      isEditing: false,
    }));
    setTodos(newTodos);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    console.log(`Dragging todo with id: ${id}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log('Dragging over a todo');
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    const draggedTodoId = e.dataTransfer.getData("text/plain");
    const draggedTodoIndex = todos.findIndex((todo) => todo.id === draggedTodoId);
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);

    if (draggedTodoIndex !== -1 && targetTodoIndex !== -1) {
      const updatedTodos = [...todos];
      const [draggedTodo] = updatedTodos.splice(draggedTodoIndex, 1);
      updatedTodos.splice(targetTodoIndex, 0, draggedTodo);

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      console.log('Todos reordered:', updatedTodos);
    }
  };

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
              onDrop={handleDrop}
              draggable
            />
          )
        )}
      </div>
    </div>
  );
};
