import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { EditContext, TestFilterContext, TodoContext } from "./TodoList";
import { StatusTodo } from "../constants/todo";

// Hiển thị lỗi
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

// Ẩn lỗi
function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
}

const TodoForm = ({ isOpen, handleCloseForm }) => {
  const { edit } = useContext(EditContext);
  const { stateFilter } = useContext(TestFilterContext);
  const { dispatch } = useContext(TodoContext);
  const [should, setShould] = useState("0");
  const [statusSelect, setStatusSelect] = useState("0");
  useEffect(() => {
    setShould(edit.isEdit ? edit.todoEdit.should : "0");
    setStatusSelect(edit.isEdit ? edit.todoEdit.status : "0");
  }, [edit]);
  const handleChangeInput = (e)=>{
    if(e.target.value.length > 40){
      showError("name-error", "Name must be less than 40 characters");
    }else{
      showError("name-error", "");
    }
  }
  const handleChangeTextarea = (e)=>{
    if(e.target.value.length > 100){
      showError("desc-error", "Description must be less than 100 characters");
    }else{
      showError("desc-error", "");
    }
  }


  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Lấy giá trị của các trường trong form
    const name = document.getElementById("name").value.trim();
    const desc = document.getElementById("desc").value.trim();
    const should = document.getElementById("should").value;
    const status = document.getElementById("status").value;

    let isValid = true;

    // Kiểm tra trường Name
    if (!name) {
      showError("name-error", "Name is required.");
      isValid = false;
    } else if (name.length < 3) {
      showError("name-error", "Name must be at least 3 characters.");
      isValid = false;
    } else {
      hideError("name-error");
    }

    // Kiểm tra trường Description
    if (!desc) {
      showError("desc-error", "Description is required.");
      isValid = false;
    } else {
      hideError("desc-error");
    }

    // Nếu form hợp lệ, tiếp tục xử lý
    if (isValid) {
      if (edit.isEdit) {
        const newTodo = {
          id: edit.todoEdit.id,
          name,
          desc,
          should,
          status,
          display: stateFilter === StatusTodo.ALL || status === stateFilter ? "block" : "none",
        };

        dispatch({ type: "edit", payload: newTodo });
      } else {
        const newTodo = {
          id: Date.now(),
          name,
          desc,
          should,
          status,
          display: stateFilter === StatusTodo.ALL || status === stateFilter ? "block" : "none",
        };
        dispatch({ type: "add", payload: newTodo });
      }
      handleCloseForm();
      e.target.reset();
      setShould("0");
      setStatusSelect("0");
      // Xử lý logic thêm vào đây
      // Ví dụ: Gửi dữ liệu tới server
    }
  };
  return (
    <>
      <div id="add-todo-modal" className={classNames("modal", { active: isOpen || edit.isEdit })}></div>
      <div id="add-todo" className={classNames("popup", { active: isOpen || edit.isEdit })}>
        <form className="form" onSubmit={handleSubmitForm}>
          <div className="popup__close" onClick={handleCloseForm}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <h2>{edit.isEdit ? "Edit Todo" : "Add Todo"}</h2>
          <div className="form__group">
            <label htmlFor="name">Name</label>
            <input
              defaultValue={edit.isEdit ? edit.todoEdit.name : ""}
              onInput={handleChangeInput}
              type="text"
              id="name"
              name="name"
              maxLength="40"
              className="form__input"
              placeholder="Please enter todo name!"
            />
            <div className="form__error" id="name-error"></div>
          </div>
          <div className="form__group">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              maxLength="100"
              defaultValue={edit.isEdit ? edit.todoEdit.desc : ""}
              onInput={handleChangeTextarea}
              className="form__textarea"
              placeholder="Please enter todo description!"
            ></textarea>
            <div className="form__error" id="desc-error"></div>
          </div>
          <div className="form__group">
            <label htmlFor="should">Should</label>
            <select
              value={should}
              name="should"
              id="should"
              className="form__select"
              onChange={(e) => setShould(e.target.value)}
            >
              <option value="0">Yes</option>
              <option value="1">Not</option>
            </select>
            <div className="form__error" id="should-error"></div>
          </div>
          <div className="form__group">
            <label htmlFor="status">Status</label>
            <select
              value={statusSelect}
              name="status"
              id="status"
              className="form__select"
              onChange={(e) => setStatusSelect(e.target.value)}
            >
              <option value="0">Pending</option>
              <option value="1">In progress</option>
              <option value="2">Completed</option>
            </select>
            <div className="form__error" id="status-error"></div>
          </div>
          <button className="form__submit todo__btn green">Confirm</button>
        </form>
      </div>
    </>
  );
};

TodoForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
};

export default TodoForm;
