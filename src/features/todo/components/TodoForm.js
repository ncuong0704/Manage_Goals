import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validateSchema";
import { useDispatch, useSelector } from "react-redux";
import { StatusTodo } from "../../../constants/todo";
import { addTodo, editTodo } from "../todoSlice";
import classNames from "classnames";

const TodoForm = ({ isOpen, handleCloseForm }) => {
  const dispatch = useDispatch();
  const statusFilter = useSelector((state) => state.todo.statusFilter);
  const edit = useSelector((state) => state.todo.editTodo);

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data) => {
    if (edit.isEdit) {
      const newTodo = {
        id: edit.todoEdit.id,
        name: data.name,
        desc: data.desc,
        should: data.should,
        status: data.status,
        display: statusFilter === StatusTodo.ALL || data.status === statusFilter ? "block" : "none",
      };
      dispatch(editTodo(newTodo));
    } else {
      const newTodo = {
        id: Date.now(),
        name: data.name,
        desc: data.desc,
        should: data.should,
        status: data.status,
        display: statusFilter === StatusTodo.ALL || data.status === statusFilter ? "block" : "none",
      };
      dispatch(addTodo(newTodo));
    }
    handleCloseForm();
    reset();
  };

  useEffect(() => {
    if (edit.isEdit) {
      reset({
        name: edit.todoEdit.name || "",
        desc: edit.todoEdit.desc || "",
        should: edit.todoEdit.should || "0",
        status: edit.todoEdit.status || "0",
      });
    } else {
      reset({
        name: "",
        desc: "",
        should: "0",
        status: "0",
      });
    }
  }, [edit, reset]);

  return (
    <div id="add-todo-modal" className={classNames("modal", { active: isOpen || edit.isEdit })}>
      <div id="add-todo" className={classNames("popup", { active: isOpen || edit.isEdit })}>
        <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="popup__close" onClick={handleCloseForm}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <h2>{edit.isEdit ? "Edit Todo" : "Add Todo"}</h2>
          <div className="form__group">
            <label htmlFor="name">Name</label>
            <div className="form__field">
              <input {...register("name")} type="text" id="name" maxLength="40" placeholder="Please enter todo name!" />
              <div className="form__count">{watch("name") ? watch("name").length : 0}/40</div>
            </div>
            <div className="form__error">{errors.name?.message ?? ""}</div>
          </div>
          <div className="form__group">
            <label htmlFor="desc">Description</label>
            <div className="form__field">
              <textarea
                {...register("desc")}
                id="desc"
                maxLength="100"
                placeholder="Please enter todo description!"
              ></textarea>
              <div className="form__count">{watch("desc") ? watch("desc").length : 0}/100</div>
            </div>
            <div className="form__error">{errors.desc?.message ?? ""}</div>
          </div>
          <div className="form__group">
            <label htmlFor="should">Should</label>
            <select {...register("should")} id="should">
              <option value="0">Yes</option>
              <option value="1">No</option>
            </select>
            <div className="form__error">{errors.should?.message}</div>
          </div>
          <div className="form__group">
            <label htmlFor="status">Status</label>
            <select {...register("status")} id="status">
              <option value={StatusTodo.PENDING}>Pending</option>
              <option value={StatusTodo.IN_PROGRESS}>In progress</option>
              <option value={StatusTodo.COMPLETED}>Completed</option>
            </select>
            <div className="form__error">{errors.status?.message}</div>
          </div>
          <button type="submit" className="form__submit todo__btn green">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

TodoForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
};

export default TodoForm;
