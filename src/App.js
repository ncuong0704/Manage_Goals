import React from "react";
import "./App.scss";
import TodoFeature from "./features/todo/Todo";
import "./index.css";

function App() {
  return (
    <div className="app">
      <TodoFeature title="To Do List"/>
  </div>
  );
}

export default App;
