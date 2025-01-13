import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoTable from "./components/TodoTable";
import { changeType } from "./todoSlice";
import classNames from "classnames";

const TodoFeature = () => {
  const type = useSelector((state) => state.todo.type);
  const dispatch = useDispatch();

  const handleChangeType = (typeNew) => {
    dispatch(changeType(typeNew));
  };
  return (
    <div className="todo">
      <div className="todo__nav">
        <button
          className={classNames({
            "todo__btn border": true,
            active: type === "day",
          })}
          onClick={() => handleChangeType("day")}
        >
          Ngày
        </button>
        <button
          className={classNames({
            "todo__btn border": true,
            active: type === "month",
          })}
          onClick={() => handleChangeType("month")}
        >
          Tháng
        </button>
        <button
          className={classNames({
            "todo__btn border": true,
            active: type === "year",
          })}
          onClick={() => handleChangeType("year")}
        >
          Năm
        </button>
      </div>
      <h2 className="todo__heading">
        {type === "day" && "Mục tiêu của ngày"}
        {type === "month" && "Mục tiêu của tháng"}
        {type === "year" && "Mục tiêu của năm"}
      </h2>
      <TodoTable />
    </div>
  );
};

TodoFeature.propTypes = {};

export default TodoFeature;
