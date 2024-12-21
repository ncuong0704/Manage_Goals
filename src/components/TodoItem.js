import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { EditContext, TestFilterContext, TodoContext } from "./TodoList";
import { StatusTodo } from "../constants/todo";
import ButtonConfirm from "./ButtonConfirm";

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const { setEdit } = useContext(EditContext);
  const { stateFilter } = useContext(TestFilterContext);

  const handleRemoveCompleted = (idTodo) => {
    dispatch({ type: "delete", payload: { id: idTodo } });
  };
  const handleUpdateStatus = (idTodo, statusTodo) => {
    let newStatus = Number(statusTodo) + 1;
    if (newStatus > 2) {
      newStatus = 2;
    }
    dispatch({
      type: "updateStatus",
      payload: {
        id: idTodo,
        status: newStatus.toString(),
        display: stateFilter === StatusTodo.ALL || newStatus.toString() === stateFilter ? "block" : "none",
      },
    });
  };
  const handleEditTodo = (todo) => {
    setEdit({
      isEdit: true,
      todoEdit: todo,
    });
  };

  return (
    <>
      <div
        className={classNames("todo__should", {
          yes: todo.should === "0",
          not: todo.should === "1",
        })}
      >
        {todo.should === "0" && "Should"}
        {todo.should === "1" && "Not should"}
      </div>
      <div
        className={classNames("todo__content", {
          completed: todo.status === "2",
        })}
      >
        <h3 className="todo__name">{todo.name}</h3>
        <p className="todo__desc">{todo.desc}</p>
      </div>

      <div className="todo__action">
        <div
          onDoubleClick={() => handleUpdateStatus(todo.id, todo.status)}
          className={classNames("todo__status todo__btn", {
            orange: todo.status === "0",
            green: todo.status === "1",
            red: todo.status === "2",
          })}
        >
          {todo.status === "0" && "Pending"}
          {todo.status === "1" && "In progress"}
          {todo.status === "2" && "Completed"}
        </div>
        <button
          className="todo__edit todo__btn blue"
          onClick={() =>
            handleEditTodo({
              id: todo.id,
              name: todo.name,
              desc: todo.desc,
              status: todo.status,
              should: todo.should,
            })
          }
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <ButtonConfirm
          name=""
          message="Are you sure you can delete this todo?"
          removeCompleted={() => handleRemoveCompleted(todo.id)}
        />
      </div>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
