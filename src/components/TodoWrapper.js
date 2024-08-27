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
  
  const [draggedTodoId, setDraggedTodoId] = useState(null);
  const [hoveredTodoId, setHoveredTodoId] = useState(null);

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
    setTodos(newTodos);
  };

  const onDragStart = (id) => {
    setDraggedTodoId(id);
  };

  const onDragOver = (event, id) => {
    event.preventDefault();
    if (id !== draggedTodoId) {
      setHoveredTodoId(id);
    }
  };

  const onDragLeave = () => {
    setHoveredTodoId(null);
  };

  const onDrop = (droppedId) => {
    const draggedTodoIndex = todos.findIndex(todo => todo.id === draggedTodoId);
    const droppedTodoIndex = todos.findIndex(todo => todo.id === droppedId);

    const reorderedTodos = [...todos];
    const [draggedTodo] = reorderedTodos.splice(draggedTodoIndex, 1);
    reorderedTodos.splice(droppedTodoIndex, 0, draggedTodo);

    setTodos(reorderedTodos);
    setDraggedTodoId(null);
    setHoveredTodoId(null);
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
              onDragStart={() => onDragStart(todo.id)}
              onDragOver={(event) => onDragOver(event, todo.id)}
              onDragLeave={onDragLeave}
              onDrop={() => onDrop(todo.id)}
              isHovered={hoveredTodoId === todo.id}
            />
          )
        )}
      </div>
    </div>
  );
};
