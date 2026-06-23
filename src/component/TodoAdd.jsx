import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddData, UpdateData, DeleteData, CheckBox } from './TodoSlice'; // Adjust path to your Redux slice
import { FaTrashAlt, FaEdit, FaPlusCircle } from 'react-icons/fa'; // Import icons

// Import Toastify components and CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoAdd = () => {
    const [Id, setId] = useState(null);
    const initialState = '';
    const [todo, setTodo] = useState(initialState);

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.data); // Assuming 'data' is the name of your slice state

    const Submit = (e) => {
        e.preventDefault();
        if (todo.trim() !== '') { // Use .trim() to prevent adding empty spaces
            if (Id !== null) {
                dispatch(UpdateData({ id: Id.id, Data: todo, Completed : Id.Completed }));
                setId(null);
                setTodo(''); // Clear input after update
                toast.success('Todo updated successfully!'); // Success toast for update
            } else {
                dispatch(AddData(todo));
                setTodo(''); // Clear input after add
                toast.success('Todo added successfully!'); // Success toast for add
            }
        } else {
            toast.error('Todo cannot be empty!'); // Error toast for empty input
        }
    };

    const Delete = (id) => {
        dispatch(DeleteData(id));
        toast.info('Todo deleted!'); // Info toast for delete
    };

    const toggle = (id) => {
        dispatch(CheckBox(id));
        const updatedTodo = data.find(item => item.id === id);
        // Conditionally show toast based on completion status
        if (updatedTodo && !updatedTodo.Completed) { // Check if it was just marked as completed
            toast.success('Todo marked as completed! ✅');
        } else {
            toast.info('Todo marked as incomplete! ❌');
        }
    };

    useEffect(() => {
        if (Id) {
            setTodo(Id.Data);
        }
    }, [Id]);

    return (
        <>
            <h1 className='text-5xl'>Todo App</h1>
            <form onSubmit={Submit} className="todo-form"> {/* Add a class for form styling */}
                <input
                    className='mt-10 border todo-input' // Add a class for input styling
                    type="text"
                    placeholder='Enter Data'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                {Id !== null ? (
                    <button type='submit' className='border bg-green-300 action-button update-form-button'>
                        <FaEdit /> Update
                    </button>
                ) : (
                    <button type='submit' className='border bg-green-300 action-button add-form-button' style={{ background: '#e2e2a0' }}>
                        <FaPlusCircle /> Add
                    </button>
                )}
            </form>

            <div className="todo-table-container">
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>Toggle</th>
                            <th>Status</th>
                            <th>Todo Item</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((todoItem) => ( // Renamed 'todo' to 'todoItem' to avoid conflict with state 'todo'
                            <tr key={todoItem.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => toggle(todoItem.id)}
                                        checked={todoItem.Completed}
                                        className="todo-checkbox" // Add class for checkbox styling
                                    />
                                </td>
                                <td className={`todo-status ${todoItem.Completed ? 'completed' : 'not-completed'}`}>
                                    {todoItem.Completed ? 'Completed ✅' : 'Not ❌'}
                                </td>
                                <td className={`todo-data-cell ${todoItem.Completed ? 'completed-text' : ''}`}>
                                    {todoItem.Data}
                                </td>
                                <td>
                                    <button
                                        onClick={() => Delete(todoItem.id)}
                                        className="todo-button delete-button"
                                        title="Delete Todo"
                                    >
                                        <FaTrashAlt /> 
                                    </button>
                                    <button
                                        onClick={() => setId(todoItem)}
                                        className="todo-button edit-button"
                                        title="Edit Todo"
                                    >
                                        <FaEdit /> 
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000} // Close after 3 seconds
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default TodoAdd;