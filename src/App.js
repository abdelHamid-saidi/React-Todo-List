import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  useEffect(() => {
    const data = localStorage.getItem("todos-store");
    if (data) {
      const parsed = JSON.parse(data);
      const now = Date.now();
      const valid = parsed.filter(t => now - t.timestamp < 2 * 24 * 60 * 60 * 1000);
      setTodos(valid);
    }
    setTimeout(() => setLoading(false), 2800);
  }, []);

  useEffect(() => {
    // const withTimestamp = todos.map(t => ({ ...t, timestamp: Date.now() }));
    // localStorage.setItem("todos-store", JSON.stringify(withTimestamp));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim().length < 3) {
      setShowWarning(true);
      return;
    }
    setTodos([...todos, { id: Date.now().toString(), text: task, completed: false }]);
    setTask("");
    setShowWarning(false);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSubmit = (id) => {
    if (editingText.trim().length >= 3) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editingText } : todo
        )
      );
      setEditingId(null);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const sunIcon = (
    <svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="34" height="34">
      <path
        d="M965.23,530.62a13.33,13.33,0,1,1-13.33-13.33,13.33,13.33,0,0,1,13.33,13.33m-11.66-18.33a1.67,1.67,0,1,1-1.67-1.67,1.66,1.66,0,0,1,1.67,1.67m0,36.66a1.67,1.67,0,1,1-1.67-1.66,1.67,1.67,0,0,1,1.67,1.66m16.66-16.66a1.67,1.67,0,1,1,1.67-1.67,1.66,1.66,0,0,1-1.67,1.67m-36.66,0a1.67,1.67,0,1,1,1.66-1.67,1.67,1.67,0,0,1-1.66,1.67M966,518.83a1.66,1.66,0,1,1-2.39-2.31l0,0a1.66,1.66,0,0,1,2.35,2.35m-25.93,25.93a1.66,1.66,0,0,1-2.39-2.31l0,0a1.66,1.66,0,0,1,2.35,2.35m23.58,0a1.67,1.67,0,0,1,2.31-2.4l0,0a1.66,1.66,0,0,1-2.35,2.35m-25.93-25.93a1.67,1.67,0,0,1,2.31-2.4l0,.05a1.66,1.66,0,0,1-2.35,2.35"
        transform="translate(-931.9 -510.62)" />
    </svg>
  );

  const moonIcon = (
    <svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="34" height="34">
      <g className="cls-1">
        <path d="M876.57,512.29a1.67,1.67,0,1,1-1.67-1.67A1.66,1.66,0,0,1,876.57,512.29Z" transform="translate(-854.9 -510.62)" />
        <path d="M894.9,530.62a1.67,1.67,0,1,1-1.67-1.67A1.67,1.67,0,0,1,894.9,530.62Z" transform="translate(-854.9 -510.62)" />
        <path d="M876.57,549a1.67,1.67,0,1,1-1.67-1.67A1.67,1.67,0,0,1,876.57,549Z" transform="translate(-854.9 -510.62)" />
        <path d="M858.24,530.62a1.67,1.67,0,1,1-1.67-1.67A1.67,1.67,0,0,1,858.24,530.62Z" transform="translate(-854.9 -510.62)" />
      </g>
      <path
        d="M869.43,522.32a.23.23,0,0,1-.14.29l-1.18.39a1.8,1.8,0,0,0-1.12,1.13l-.4,1.18a.22.22,0,0,1-.41,0l-.4-1.18a1.77,1.77,0,0,0-1.12-1.13l-1.19-.39a.2.2,0,0,1-.13-.14.24.24,0,0,1,.13-.29l1.19-.39a1.74,1.74,0,0,0,1.12-1.12l.4-1.18a.2.2,0,0,1,.13-.14.21.21,0,0,1,.28.14l.4,1.18a1.76,1.76,0,0,0,1.12,1.12l1.18.39A.24.24,0,0,1,869.43,522.32Z"
        transform="translate(-854.9 -510.62)" />
      <path
        d="M876.06,529.55l-1.78.6a2.66,2.66,0,0,0-1.68,1.67l-.59,1.79a.28.28,0,0,1-.21.2.33.33,0,0,1-.42-.2l-.6-1.79a2.62,2.62,0,0,0-1.67-1.67l-1.79-.6a.32.32,0,0,1-.2-.21.33.33,0,0,1,.2-.42l1.79-.59a2.66,2.66,0,0,0,1.67-1.68l.6-1.78a.32.32,0,0,1,.21-.21.34.34,0,0,1,.42.21l.59,1.78a2.7,2.7,0,0,0,1.68,1.68l1.78.59a.32.32,0,0,1,.21.21A.33.33,0,0,1,876.06,529.55Z"
        transform="translate(-854.9 -510.62)" />
      <path
        d="M888.15,532.15a13.33,13.33,0,0,1-24,6.33.67.67,0,0,1,.76-1,12.31,12.31,0,0,0,14.29-18.16.68.68,0,0,1,.82-1A13.33,13.33,0,0,1,888.15,532.15Z"
        transform="translate(-854.9 -510.62)" />
    </svg>
  );

  return loading ? (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  ) : (
    <div className="todo-container">
      <div className="header-bar">
        <svg className="header-logo pointer" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64">
            <defs/>
            <path d="m21.76,6l4.24,4.24-13.24,13.24L4,14.73l4.24-4.24,4.52,4.52,9-9Zm-9,25l-4.52-4.52-4.24,4.24,8.76,8.76,13.24-13.24-4.24-4.24-9,9Zm0,16l-4.52-4.52-4.24,4.24,8.76,8.76,13.24-13.24-4.24-4.24-9,9ZM28,13v6h28v-6h-28Zm0,22h28v-6h-28v6Zm0,16h28v-6h-28v6Z"/>
        </svg>
        <h2 className="pointer">Ma Todo List</h2>
        <button onClick={() => setDarkMode((prev) => !prev)} className="icon-btn theme-btn">
           {darkMode ? sunIcon : moonIcon}
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="task-input"
            placeholder="Ajouter une tâche"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="button-33">
            Ajouter
          </button>
        </form>
        {showWarning && <p className="warning">Minimum 3 caractères requis</p>}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ padding: 0, listStyle: "none" }}
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`todo-list-item ${todo.completed ? "completed" : ""}`}
                      style={{
                        ...provided.draggableProps.style,
                        transform: snapshot.isDragging && provided.draggableProps.style?.transform
                          ? provided.draggableProps.style.transform.replace(
                              /translate\(([^,]+), ([^)]+)\)/,
                              (match, x, y) => `translate(calc(${x} - 100%), calc(${y} - 200%))`
                            )
                          : provided.draggableProps.style?.transform
                      }}
                    >
                      <div className="todo-item">
                        <div className="checkbox-wrapper-12">
                          <div className="cbx">
                            <input
                              id={`cbx-${todo.id}`}
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => handleToggle(todo.id)}
                            />
                            <label htmlFor={`cbx-${todo.id}`}></label>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                              <path d="M2 8.36364L6.23077 12L13 2"></path>
                            </svg>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                              <filter id="goo-12">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 22 -7" result="goo-12" />
                                <feBlend in="SourceGraphic" in2="goo-12" />
                              </filter>
                            </defs>
                          </svg>
                        </div>
                        {editingId === todo.id ? (
                          <input
                            autoFocus
                            type="text"
                            value={editingText}
                            onChange={handleEditChange}
                            onBlur={() => handleEditSubmit(todo.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleEditSubmit(todo.id);
                            }}
                            className="edit-input"
                          />
                        ) : (
                          <span
                            onClick={() => handleEdit(todo.id, todo.text)}
                            className="todo-text"
                            title="Cliquer pour modifier"
                          >
                            {todo.text}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="delete-btn"
                        title="Supprimer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
