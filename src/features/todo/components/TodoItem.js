import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getEditTodo, updateStatusTodo } from "../todoSlice";
import { StatusTodo } from "../../../constants/todo";
import ButtonConfirm from "./ButtonConfirm";
import useNotificationSound from "../../../hooks/useNotificationSound";

const formatDate = (datetime) => {
  const dateObj = new Date(datetime);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}  ${day}/${month}/${year}`;
};

const formatTime = (datetimeStr) => {
  const datetimeObj = new Date(datetimeStr);
  const timestamp = datetimeObj.getTime();
  return timestamp;
};

const compareTime = (time1) => {
  const current = new Date();
  return current.getTime() > formatTime(time1);
};

const TodoItem = ({ todo }) => {
  const statusFilter = useSelector((state) => state.todo.statusFilter);
  const dispatch = useDispatch();
  const playNotification = useNotificationSound();

  // Kiểm tra và phát âm thanh khi công việc đến hạn
  useEffect(() => {
    const checkAndNotify = () => {
      if (
        todo.status === StatusTodo.PENDING &&
        compareTime(todo.begin)
      ) {
        playNotification();
      }
      if (
        todo.status === StatusTodo.IN_PROGRESS &&
        compareTime(todo.end)
      ) {
        playNotification();
      }
    };

    // Kiểm tra ngay khi component được mount
    checkAndNotify();

    // Kiểm tra mỗi phút
    const interval = setInterval(checkAndNotify, 60000);

    return () => clearInterval(interval);
  }, [todo.begin, todo.end, todo.status, playNotification]);

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
    dispatch(
      getEditTodo({
        isEdit: true,
        todoEdit: newTodo,
      })
    );
  };

  const handleRemoveCompleted = (idTodo) => {
    dispatch(deleteTodo({ id: idTodo }));
  };

  return (
    <>
      <div className="todo__date">
        <span
          className={classNames({
            start: compareTime(todo.begin) && !compareTime(todo.end) && todo.status === StatusTodo.PENDING,
            expired: compareTime(todo.end),
          })}
        >
          {todo.status === StatusTodo.PENDING && compareTime(todo.begin) && !compareTime(todo.end) && "Đã đến hẹn"}
          {todo.status !== StatusTodo.COMPLETED && compareTime(todo.end) && "Chưa hoàn thành"}
        </span>
        <span>{`Bắt đầu: ${formatDate(todo.begin)}`} <br /> {`Kết thúc: ${formatDate(todo.end)}`}</span>
      </div>
      <div
        className={classNames("todo__should", {
          yes: todo.should === "0",
          not: todo.should === "1",
        })}
      >
        {todo.should === "0" && "Nên"}
        {todo.should === "1" && "Không nên"}
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
          {todo.status === "0" && "Đang đợi"}
          {todo.status === "1" && "Đang thực hiện"}
          {todo.status === "2" && "Đã hoàn thành"}
        </div>
        <button className="todo__edit todo__btn blue" onClick={() => handleEditTodo(todo)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
