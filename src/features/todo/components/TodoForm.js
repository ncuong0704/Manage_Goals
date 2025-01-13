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
        begin: data.begin,
        end: data.end,
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
        begin: data.begin,
        end: data.end,
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
        begin: edit.todoEdit.begin || "",
        end: edit.todoEdit.end || "",
        should: edit.todoEdit.should || "0",
        status: edit.todoEdit.status || "0",
      });
    } else {
      reset({
        name: "",
        desc: "",
        begin: "",
        end: "",
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
          <h2>{edit.isEdit ? "Chỉnh sửa mục tiêu" : "Thêm mục tiêu"}</h2>
          <div className="form__group">
            <label htmlFor="name">Tên mục tiêu</label>
            <div className="form__field">
              <input {...register("name")} type="text" id="name" maxLength="40" placeholder="Nhập mục tiêu!" />
              <div className="form__count">{watch("name") ? watch("name").length : 0}/40</div>
            </div>
            <div className="form__error">{errors.name?.message ?? ""}</div>
          </div>
          <div className="form__group">
            <label htmlFor="desc">Chi tiết</label>
            <div className="form__field">
              <textarea
                {...register("desc")}
                id="desc"
                maxLength="200"
                placeholder="Nhập chi tiết mục tiêu!"
              ></textarea>
              <div className="form__count">{watch("desc") ? watch("desc").length : 0}/200</div>
            </div>
            <div className="form__error">{errors.desc?.message ?? ""}</div>
          </div>
          <div className="form__group">
            <label htmlFor="begin">Thời gian bắt đầu</label>
            <input {...register("begin")} id="begin" type="datetime-local"></input>
            <div className="form__error">{errors.begin?.message ?? ""}</div>
          </div>
          <div className="form__group">
            <label htmlFor="end">Thời gian kết thúc</label>
            <input {...register("end")} id="end" type="datetime-local"></input>
            <div className="form__error">{errors.end?.message ?? ""}</div>
          </div>
          <div className="form__group">
            <label htmlFor="should">Loại</label>
            <select {...register("should")} id="should">
              <option value="0">Nên</option>
              <option value="1">Không nên</option>
            </select>
            <div className="form__error">{errors.should?.message}</div>
          </div>
          <div className="form__group">
            <label htmlFor="status">Trạng thái</label>
            <select {...register("status")} id="status">
              <option value={StatusTodo.PENDING}>Đang đợi</option>
              <option value={StatusTodo.IN_PROGRESS}>Đang thực hiện</option>
              <option value={StatusTodo.COMPLETED}>Đã hoàn thành</option>
            </select>
            <div className="form__error">{errors.status?.message}</div>
          </div>
          <button type="submit" className="form__submit todo__btn green">
            Xác nhận
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
