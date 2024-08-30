import React, { useState, useEffect } from "react";
import { Todo } from "./Todo"; // Import the Todo component
import { TodoForm } from "./TodoForm"; // Import the TodoForm component
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs
import { EditTodoForm } from "./EditTodoForm"; // Import the EditTodoForm component

/**
 * TodoWrapper Component
 *
 * Manages the list of todos, including adding, editing, deleting, and reordering tasks.
 * Persists tasks in local storage.
 */
export const TodoWrapper = () => {
  // Initialize todos from local storage, or set up an empty list if not found
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return savedTodos.map((todo) => ({
      ...todo,
      startDate: todo.startDate || new Date().toISOString().split("T")[0], // Default start date if missing
    }));
  });

  // Persist todos in local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo task
  const addTodo = (task, startDate) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task, startDate, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
  };

  // Delete a todo task by its ID
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Toggle the completion status of a todo task
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Toggle the editing status of a todo task
  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
  };

  // Update a task's description and start date
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            task: task.task,
            startDate: task.startDate,
            isEditing: false,
          }
        : todo
    );
    setTodos(newTodos);
  };

  // Mark a task as done and set its done date
  const markAsDone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: true,
            doneDate: new Date(new Date().setHours(0, 0, 0, 0))
              .toISOString()
              .split("T")[0],
          }
        : todo
    );
    setTodos(newTodos);
  };

  // Mark a task as undone and remove its done date
  const markAsUndone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: false, doneDate: null } : todo
    );
    setTodos(newTodos);
  };

  // Cancel editing mode for all tasks
  const cancelAllEdits = () => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      isEditing: false,
    }));
    setTodos(newTodos);
  };

  // Handle the start of dragging a todo item
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    console.log(`Dragging todo with id: ${id}`);
  };

  // Handle dragging over another todo item
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("Dragging over a todo");
  };

  // Handle dropping a todo item on another
  const handleDrop = (e, id) => {
    e.preventDefault();
    const draggedTodoId = e.dataTransfer.getData("text/plain");
    const draggedTodoIndex = todos.findIndex(
      (todo) => todo.id === draggedTodoId
    );
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);

    if (draggedTodoIndex !== -1 && targetTodoIndex !== -1) {
      const updatedTodos = [...todos];
      const [draggedTodo] = updatedTodos.splice(draggedTodoIndex, 1);
      updatedTodos.splice(targetTodoIndex, 0, draggedTodo);

      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      console.log("Todos reordered:", updatedTodos);
    }
  };

  return (
    <div
      className="section"
      onClick={cancelAllEdits}
      style={{ cursor: "default" }}
    >
      <TodoForm addTodo={addTodo} /> {/* Form to add new todos */}
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

export default TodoWrapper;
