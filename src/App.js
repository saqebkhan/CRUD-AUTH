import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import EditForm from "./EditForm";
import "./style.css";
import LogInForm from "./LogInForm";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const userLogInInfo = localStorage.getItem("isLoggedIn");
    if (userLogInInfo === "1") setIsAuth(true);
  }, []);

  const logInHandler = () => {
    setIsAuth(true);
    localStorage.setItem("isLoggedIn", "1");
  };

  function handleAddInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleAddFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: new Date(),
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  const logOutHandler = () => {
    setIsAuth(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="App">
      {!isAuth && <LogInForm onLogIn={logInHandler} />}
      {isAuth && (
        <div>
          <button
            style={{ float: "right", margin: 10 }}
            onClick={logOutHandler}
          >
            Log Out
          </button>
          {isEditing ? (
            <EditForm
              currentTodo={currentTodo}
              setIsEditing={setIsEditing}
              onEditInputChange={handleEditInputChange}
              onEditFormSubmit={handleEditFormSubmit}
            />
          ) : (
            <AddTodoForm
              todo={todo}
              onAddInputChange={handleAddInputChange}
              onAddFormSubmit={handleAddFormSubmit}
            />
          )}

          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                todo={todo}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
