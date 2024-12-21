import React, { useContext, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { EditContext, TestFilterContext, TodoContext } from "./TodoList";
import { StatusTodo } from "../constants/todo";
import classNames from "classnames";
import ButtonConfirm from "./ButtonConfirm";
import ShowNotification from "./ShowNotication";

const statusOrder = {
  1: 1,
  0: 2,
  2: 3,
};

const TodoTable = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [openForm, setOpenForm] = useState(false);
  const { edit, setEdit } = useContext(EditContext);
  const { stateFilter, setStateFilter } = useContext(TestFilterContext);
  const [isOpenProp, setIsOpenProp] = useState(false);
  const [messageProp, setMessageProp] = useState("");
  const [titleProp, setTitleProp] = useState("");
  const [statusProp, setStatusProp] = useState(false);

  const handleCloseForm = () => {
    if (edit.isEdit) {
      setEdit({ ...edit, isEdit: false });
      setOpenForm(false);
    } else {
      setOpenForm(!openForm);
    }
  };
  const handleCloseNotification = () => {
    setIsOpenProp(false);
  };
  const handleRemoveCompleted = () => {
    dispatch({ type: "deleteAllCompleted", payload: { status: StatusTodo.COMPLETED } });
    const filterTodoCompleted = todos.filter((todo) => todo.status === StatusTodo.COMPLETED);
    setIsOpenProp(true);
    console.log(filterTodoCompleted.length);

    if (filterTodoCompleted.length) {
      setTitleProp("Congratulations");
      setMessageProp(`You have completed "${filterTodoCompleted.length}" to-dos.`);
      setStatusProp(true);
    } else {
      setTitleProp("Unfinished");
      setMessageProp("You haven't completed any to-dos yet!");
      setStatusProp(false);
    }
  };
  const handleChangeFilter = (e) => {
    dispatch({ type: "filter", payload: { status: e.target.value } });
    setStateFilter(e.target.value);
  };

  return (
    <>
      <ShowNotification
        closeNotification={handleCloseNotification}
        status={statusProp}
        isOpenProp={isOpenProp}
        title={titleProp}
        message={messageProp}
      />
      <div className="todo__top">
        <button className="todo__btn green" onClick={() => setOpenForm(!openForm)}>
          Add
        </button>
        <select
          className={classNames("todo__select ", {
            blue: stateFilter === "3",
            orange: stateFilter === "0",
            green: stateFilter === "1",
            red: stateFilter === "2",
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

      <TodoForm isOpen={openForm} handleCloseForm={handleCloseForm} />
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
    </>
  );
};

export default TodoTable;
