import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();
// TodoWrapperLocalStorage component: Manages the todo list with local storage persistence
export const TodoWrapperLocalStorage = () => {
    // State to hold the list of todos
    const [todos, setTodos] = useState([]);

    // useEffect to load todos from local storage on component mount
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    // Function to add a new todo
    const addTodo = todo => {
        const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    // Function to toggle the completion status of a todo
    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    // Function to delete a todo
    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    // Function to toggle the editing status of a todo
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    // Function to update the task of a todo
    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <div className='TodoWrapper'>
            {/* Header */}
            <h1>Get Things Done!</h1>
            {/* Form to add a new todo */}
            <TodoForm addTodo={addTodo} />
            {/* List of todos */}
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    // EditTodoForm for editing a todo
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                    // Todo component for displaying a todo
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    );
};
