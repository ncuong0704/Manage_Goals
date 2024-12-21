import React, { createContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import TodoTable from "./TodoTable";
import { StatusTodo } from "../constants/todo";

const TodoContext = createContext();
const EditContext = createContext();
const TestFilterContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "getAll":
      return action.all;
    case "add":
      const addState = [
        ...state,
        {
          id: Date.now(),
          name: action.payload.name,
          desc: action.payload.desc,
          status: action.payload.status,
          should: action.payload.should,
          display: action.payload.display,
        },
      ];
      localStorage.setItem("todoList", JSON.stringify(addState));
      return addState;
    case "edit":
      const editState = state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              name: action.payload.name,
              desc: action.payload.desc,
              status: action.payload.status,
              should: action.payload.should,
              display: action.payload.display,
            }
          : todo
      );
      localStorage.setItem("todoList", JSON.stringify(editState));
      return editState;
    case "delete":
      const deleteState = state.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("todoList", JSON.stringify(deleteState));
      return deleteState;

    case "updateStatus":
      const updateStatusState = state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              status: action.payload.status,
              display: action.payload.display,
            }
          : todo
      );
      localStorage.setItem("todoList", JSON.stringify(updateStatusState));
      return updateStatusState;
    case "deleteAllCompleted":
      const deleteAllCompletedState = state.filter((todo) => todo.status !== action.payload.status);
      localStorage.setItem("todoList", JSON.stringify(deleteAllCompletedState));
      return deleteAllCompletedState;
    case "filter":
      const filterState = state.map((todo) =>
        action.payload.status === StatusTodo.ALL || todo.status === action.payload.status
          ? {
              ...todo,
              display: "block",
            }
          : {
              ...todo,
              display: "none",
            }
      );
      localStorage.setItem("todoList", JSON.stringify(filterState));
      return filterState;
    default:
      throw new Error("Unknown action type");
  }
};

const TodoList = ({ title }) => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [edit, setEdit] = useState({
    isEdit: false,
    todoEdit: {},
  });
  const [stateFilter, setStateFilter] = useState(StatusTodo.ALL);
  useEffect(() => {
    const initialTodo = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
    dispatch({ type: "getAll", all: initialTodo });
  }, []);

  return (
    <div className="todo">
      <h2 className="todo__heading">{title}</h2>
      <TodoContext.Provider value={{ todos, dispatch }}>
        <EditContext.Provider value={{ edit, setEdit }}>
          <TestFilterContext.Provider value={{ stateFilter, setStateFilter }}>
            <TodoTable />
          </TestFilterContext.Provider>
        </EditContext.Provider>
      </TodoContext.Provider>
    </div>
  );
};

TodoList.propTypes = {
  title: PropTypes.string.isRequired,
};
export { TodoContext, EditContext, TestFilterContext };
export default TodoList;
