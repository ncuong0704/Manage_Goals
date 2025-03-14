import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusTodo } from "../../../constants/todo";
import { deleteAllCompleted, filterTodo, getEditTodo } from "../todoSlice";
import ButtonConfirm from "./ButtonConfirm";
import ShowNotification from "./ShowNotification";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const formatTime = (datetimeStr) => {
  const datetimeObj = new Date(datetimeStr);
  const timestamp = datetimeObj.getTime();
  return timestamp;
};

const TodoTable = () => {
  const statusFilter = useSelector((state) => state.todo.statusFilter);
  const [isOpen, setIsOpen] = useState(false);
  const todos = useSelector((state) => state.todo.todoList);
  const type = useSelector((state) => state.todo.type);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState({
    open: false,
    title: "",
    message: "",
    status: false,
  });

  // Lưu todoList vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  // Tự động cập nhật và lọc dữ liệu mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(filterTodo({ status: statusFilter }));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, statusFilter]);

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
    let filterTodoCompleted = null;
    switch (type) {
      case "day":
        filterTodoCompleted = todos.day.filter((todo) => todo.status === StatusTodo.COMPLETED);
        break;
      case "month":
        filterTodoCompleted = todos.month.filter((todo) => todo.status === StatusTodo.COMPLETED);
        break;
      case "year":
        filterTodoCompleted = todos.year.filter((todo) => todo.status === StatusTodo.COMPLETED);
        break;
      default:
        break;
    }
    if (filterTodoCompleted.length) {
      setShowNotification({
        open: true,
        title: "Chúc mừng bạn",
        message: `Bạn đã hoàn thành "${filterTodoCompleted.length}" mục tiêu.`,
        status: true,
      });
    } else {
      setShowNotification({
        open: true,
        title: "Rất tiếc!",
        message: "Bạn chưa hoàn thành mục tiêu nào!",
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
          Thêm
        </button>
        <select
          className={classNames("todo__select ", {
            blue: statusFilter === "3",
            orange: statusFilter === "0",
            green: statusFilter === "1",
            red: statusFilter === "2",
          })}
          value={statusFilter}
          onChange={handleChangeFilter}
        >
          <option className="todo__option blue" value={StatusTodo.ALL}>
            Tất cả
          </option>
          <option className="todo__option orange" value={StatusTodo.PENDING}>
            Đang đợi
          </option>
          <option className="todo__option green" value={StatusTodo.IN_PROGRESS}>
            Đang thực hiện
          </option>
          <option className="todo__option red" value={StatusTodo.COMPLETED}>
            Đã hoàn thành
          </option>
        </select>
      </div>
      <TodoForm isOpen={isOpen} handleCloseForm={handleCloseForm} />
      <ul className="todo__list">
        {type === "day" && (
          <>
            {!todos.day.length && <li className="todo__not">Vui lòng nhấp vào nút "Thêm" để thêm một mục tiêu cần làm trước trong ngày!</li>}
            {!!todos.day.length &&
              todos.day
                .slice() // Tạo một bản sao để tránh thay đổi mảng gốc
                .sort((a, b) => formatTime(a.begin) - formatTime(b.begin)) // Sắp xếp theo thứ tự ưu tiên
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
          </>
        )}
        {type === "month" && (
          <>
            {!todos.month.length && <li className="todo__not">Vui lòng nhấp vào nút "Thêm" để thêm một mục tiêu cần làm trước trong tháng!</li>}
            {!!todos.month.length &&
              todos.month
                .slice() // Tạo một bản sao để tránh thay đổi mảng gốc
                .sort((a, b) => formatTime(a.begin) - formatTime(b.begin)) // Sắp xếp theo thứ tự ưu tiên
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
          </>
        )}
        {type === "year" && (
          <>
            {!todos.year.length && <li className="todo__not">Vui lòng nhấp vào nút "Thêm" để thêm một mục tiêu cần làm trước trong năm!</li>}
            {!!todos.year.length &&
              todos.year
                .slice() // Tạo một bản sao để tránh thay đổi mảng gốc
                .sort((a, b) => formatTime(a.begin) - formatTime(b.begin)) // Sắp xếp theo thứ tự ưu tiên
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
          </>
        )}
      </ul>
      <ButtonConfirm
        name="Xoá đã hoàn thành"
        isTrash={true}
        message="Bạn có chắc xoá các mục tiêu đã hoàn thành?"
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
