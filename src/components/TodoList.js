import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './CreateContext';

function TodoList() {
    const { username } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [error, setError] = useState(null);
    const [editingTodo, setEditingTodo] = useState(null);
    const [newTodoValue, setNewTodoValue] = useState('');

    useEffect(() => {
        if (!username) {
            setError('Username is not defined');
            return;
        }

        axios.get(`http://localhost:8080/${username}`)
            .then(response => {
                const data = response.data;
                if (!Array.isArray(data)) {
                    setError('Invalid data format from backend');
                    return;
                }
                setTodos(data);
            })
            .catch(error => {
                setError(`Error fetching todos: ${error.message}`);
            });
    }, [username]);

    const addTask = async () => {
        if (!task) {
            setError('Task is empty');
            return;
        }

        try {
            const userDto = { login: username, todo: task };
            const response = await axios.post('http://localhost:8080/add', userDto);
            const newTodo = response.data.todo;
            if (!newTodo) {
                setError('Invalid todo string from backend');
                return;
            }
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setTask('');
        } catch (error) {
            setError(`Error adding task: ${error.message}`);
        }
    };

    const deleteTodo = async (todo) => {
        try {
            const deleteDto = { login: username, todo: todo };
            await axios.delete(`http://localhost:8080/delete`, { data: deleteDto });
            setTodos((prevTodos) => prevTodos.filter((t) => t !== todo));
        } catch (error) {
            setError(`Error deleting task: ${error.message}`);
        }
    };

    const editTodo = async (oldTodo) => {
        if (!newTodoValue) {
            setError('New todo value is empty');
            return;
        }

        try {
            const editDto = { login: username, oldTodo: oldTodo, newTodo: newTodoValue };
            await axios.put(`http://localhost:8080/edit`, editDto);
            setTodos((prevTodos) => prevTodos.map((t) => t === oldTodo ? newTodoValue : t));
            setEditingTodo(null);
            setNewTodoValue('');
        } catch (error) {
            setError(`Error editing task: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <p>Welcome, {username}!</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={addTask}>Add Task</button>
            <button onClick={() => window.location.href = '/'}>Return to Main Page</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {editingTodo === todo ? (
                            <>
                                <input type="text"
                                    value={newTodoValue}
                                    onChange={(e) => setNewTodoValue(e.target.value)}
                                    placeholder="Edit todo"
                                />
                                <button onClick={() => editTodo(todo)}>Confirm</button>
                            </>
                        ) : (
                            <>
                                <span>{todo}</span>
                                <button onClick={() => {
                                    setEditingTodo(todo);
                                    setNewTodoValue(todo);
                                }}>Edit</button>
                            </>
                        )}
                        <button onClick={() => deleteTodo(todo)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
