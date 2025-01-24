import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./App.css"
const App = () => {
  const [state, setState] = useState([
    { id: 1, checked: false, item: "coding" },
    { id: 2, checked: false, item: "Aptitude" },
    { id: 3, checked: false, item: "walking" },
  ]);

  const [newItem, setNewItem] = useState("");

  const handleCheck = (id) => {
    const updatedList = state.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setState(updatedList);
  };

  const handleDelete = (id) => {
    const filteredList = state.filter((item) => item.id !== id);
    setState(filteredList);
  };

  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const newId = state.length ? state[state.length - 1].id + 1 : 1;
    const updatedList = [...state, { id: newId, checked: false, item: newItem }];
    setState(updatedList);
    setNewItem("");
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
      {state.length ? (
        <ul className="todo-list">
          {state.map((item) => (
            <li key={item.id} className="todo-item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(item.id)}
              >
                {item.item}
              </label>
              <FaTrashAlt
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
                className="delete-icon"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-list">The list is empty</p>
      )}
    </div>
  );
};

export default App;
