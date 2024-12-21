import React from "react";
import TodoList from "./components/TodoList";
import "./index.css";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <TodoList title="Todo List" />
  </div>
  );
}

export default App;
