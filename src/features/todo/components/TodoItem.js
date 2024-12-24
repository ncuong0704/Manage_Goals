import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getEditTodo, updateStatusTodo } from "../todoSlice";
import { StatusTodo } from "../../../constants/todo";
import ButtonConfirm from "./ButtonConfirm";

const TodoItem = ({ todo }) => {
  const statusFilter = useSelector((state) => state.todo.statusFilter);
  const dispatch = useDispatch();
  const handleUpdateStatus = (idTodo, statusTodo) => {
    let status = Number(statusTodo) + 1;
    if (status > 2) {
      status = 2;
    }
    dispatch(
      updateStatusTodo({
        id: idTodo,
        status: status.toString(),
        display: statusFilter === StatusTodo.ALL || status.toString() === statusFilter ? "block" : "none",
      })
    );
  };
  const handleEditTodo = (newTodo) => {
    console.log(newTodo, "test 1");
    dispatch(
      getEditTodo({
        isEdit: true,
        todoEdit: newTodo,
      })
    );
  };
  const handleRemoveCompleted = (idTodo) => {
    dispatch(deleteTodo({id: idTodo}));
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
        <button className="todo__edit todo__btn blue" onClick={() => handleEditTodo(todo)}>
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
