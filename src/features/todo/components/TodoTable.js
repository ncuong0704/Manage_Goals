import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { StatusTodo } from "../../../constants/todo";
import classNames from "classnames";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { deleteAllCompleted, filterTodo, getEditTodo } from "../todoSlice";
import ButtonConfirm from "./ButtonConfirm";
import ShowNotification from "./ShowNotification";

const statusOrder = {
  1: 1,
  0: 2,
  2: 3,
};

const TodoTable = (props) => {
  const statusFilter = useSelector((state) => state.todo.statusFilter);
  const [isOpen, setIsOpen] = useState(false);
  const todos = useSelector((state) => state.todo.todoList);
  const [showNotification, setShowNotification] = useState({
    open: false,
    title: "",
    message: "",
    status: false,
  });
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const dispatch = useDispatch();
  const handleOpenForm = () => {
    setIsOpen(true);
  };
  const handleCloseForm = () => {
    setIsOpen(false);
    dispatch(
      getEditTodo({
        isEdit: false,
        todoEdit: [],
      })
    );
  };
  const handleChangeFilter = (e) => {
    dispatch(filterTodo({ status: e.target.value }));
  };
  const handleRemoveCompleted = () => {
    const filterTodoCompleted = todos.filter((todo) => todo.status === StatusTodo.COMPLETED);
    if (filterTodoCompleted.length) {
      setShowNotification({
        open: true,
        title: "Congratulations",
        message: `You have completed "${filterTodoCompleted.length}" to-dos.`,
        status: true,
      });
    } else {
      setShowNotification({
        open: true,
        title: "Unfinished",
        message: "You haven't completed any to-dos yet!",
        status: false,
      });
    }
    dispatch(deleteAllCompleted());
  };
  const handleCloseNotification = () => {
    setShowNotification({
      ...showNotification,
      open: false,
    });
  };
  return (
    <>
      <div className="todo__top">
        <button className="todo__btn green" onClick={handleOpenForm}>
          Add
        </button>
        <select
          className={classNames("todo__select ", {
            blue: statusFilter === "3",
            orange: statusFilter === "0",
            green: statusFilter === "1",
            red: statusFilter === "2",
          })}
          onChange={handleChangeFilter}
        >
          <option className="todo__option blue" value={StatusTodo.ALL}>
            All
          </option>
          <option className="todo__option orange" value={StatusTodo.PENDING}>
            Pending
          </option>
          <option className="todo__option green" value={StatusTodo.IN_PROGRESS}>
            In Progress
          </option>
          <option className="todo__option red" value={StatusTodo.COMPLETED}>
            Completed
          </option>
        </select>
      </div>
      <TodoForm isOpen={isOpen} handleCloseForm={handleCloseForm} />
      <ul className="todo__list">
        {!todos.length && <li className="todo__not">Please click the "Add" button to add a to-do first!</li>}
        {!!todos.length &&
          todos
            .slice() // Tạo một bản sao để tránh thay đổi mảng gốc
            .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]) // Sắp xếp theo thứ tự ưu tiên
            .map((todo) => {
              return (
                <li
                  className={classNames("todo__item", {
                    hidden: todo.display === "none",
                  })}
                  key={todo.id}
                >
                  <TodoItem todo={todo} />
                </li>
              );
            })}
      </ul>
      <ButtonConfirm
        name="Completed"
        isTrash={true}
        message="Are you sure the deletion is complete!"
        removeCompleted={handleRemoveCompleted}
      />
      <ShowNotification
        key="show-notification"
        openNotification={showNotification.open}
        title={showNotification.title}
        message={showNotification.message}
        status={showNotification.status}
        closeNotification={handleCloseNotification}
      />
    </>
  );
};

TodoTable.propTypes = {};

export default TodoTable;
