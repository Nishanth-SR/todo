import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState({});

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:8080/api/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post("http://localhost:8080/api/todos", {
      title,
      completed: false,
    });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      console.log("Deleting todo with id:", id);
      fetchTodos();
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  const updateTodo = async (id) => {
  try {
    const updatedTitled = updatedTitle[id] || ""; // get the input value for this specific todo
    if (!updatedTitled.trim()) {
      alert("Title cannot be empty");
      return;
    }
    await axios.put(`http://localhost:8080/api/todos/${id}`, { title: updatedTitled, completed: false });
    console.log("Updating todo with id:", id);
    fetchTodos();
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
  }
};


  useEffect(() => {
    fetchTodos();
  }, []); 

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} (ID: {todo.id})
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <input
              value={updatedTitle[todo.id] || ""}
              onChange={(e) => setUpdatedTitle({ ...updatedTitle, [todo.id]: e.target.value })}
              placeholder="Update todo"
            />
            <button onClick={() => updateTodo(todo.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
