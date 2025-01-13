import { createSlice } from "@reduxjs/toolkit";
import { StatusTodo } from "../../constants/todo";
import { date } from "yup";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    type: "day",
    statusFilter: StatusTodo.ALL,
    editTodo: {
      isEdit: false,
      todoEdit: {},
    },
    todoList: {
      day: localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")).day : [],
      month: localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")).month : [],
      year: localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")).year : [],
    },
  },
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
      state.statusFilter = StatusTodo.ALL;
      switch (state.type) {
        case "day":
          state.todoList.day = state.todoList.day.map((todo) => ({
            ...todo,
            display: "block",
          }));
          break;
        case "month":
          state.todoList.month = state.todoList.month.map((todo) => ({
            ...todo,
            display: "block",
          }));
          break;
        case "year":
          state.todoList.year = state.todoList.year.map((todo) => ({
            ...todo,
            display: "block",
          }));
          break;
        default:
          break;
      }
    },
    addTodo: (state, action) => {
      switch (state.type) {
        case "day":
          state.todoList.day.push({
            id: Date.now(),
            name: action.payload.name,
            desc: action.payload.desc,
            begin: action.payload.begin,
            end: action.payload.end,
            status: action.payload.status,
            should: action.payload.should,
            display: action.payload.display,
          });
          break;
        case "month":
          state.todoList.month.push({
            id: Date.now(),
            name: action.payload.name,
            desc: action.payload.desc,
            begin: action.payload.begin,
            end: action.payload.end,
            status: action.payload.status,
            should: action.payload.should,
            display: action.payload.display,
          });
          break;
        case "year":
          state.todoList.year.push({
            id: Date.now(),
            name: action.payload.name,
            desc: action.payload.desc,
            begin: action.payload.begin,
            end: action.payload.end,
            status: action.payload.status,
            should: action.payload.should,
            display: action.payload.display,
          });
          break;

        default:
          break;
      }
      state.editTodo = {
        isEdit: false,
        todoEdit: {},
      };
    },
    editTodo: (state, action) => {
      switch (state.type) {
        case "day":
          state.todoList.day = state.todoList.day.map((todo) =>
            todo.id === action.payload.id
              ? {
                  ...todo,
                  name: action.payload?.name ?? todo.name,
                  desc: action.payload.desc ?? todo.desc,
                  begin: action.payload.begin ?? todo.begin,
                  end: action.payload.end ?? todo.end,
                  status: action.payload.status ?? todo.status,
                  should: action.payload.should ?? todo.should,
                  display: action.payload.display ?? todo.display,
                }
              : todo
          );
          break;
        case "month":
          state.todoList.month = state.todoList.month.map((todo) =>
            todo.id === action.payload.id
              ? {
                  ...todo,
                  name: action.payload?.name ?? todo.name,
                  desc: action.payload.desc ?? todo.desc,
                  begin: action.payload.begin ?? todo.begin,
                  end: action.payload.end ?? todo.end,
                  status: action.payload.status ?? todo.status,
                  should: action.payload.should ?? todo.should,
                  display: action.payload.display ?? todo.display,
                }
              : todo
          );
          break;
        case "year":
          state.todoList.year = state.todoList.year.map((todo) =>
            todo.id === action.payload.id
              ? {
                  ...todo,
                  name: action.payload?.name ?? todo.name,
                  desc: action.payload.desc ?? todo.desc,
                  begin: action.payload.begin ?? todo.begin,
                  end: action.payload.end ?? todo.end,
                  status: action.payload.status ?? todo.status,
                  should: action.payload.should ?? todo.should,
                  display: action.payload.display ?? todo.display,
                }
              : todo
          );
          break;
        default:
          break;
      }
    },
    updateStatusTodo: (state, action) => {
      const { id, status, display } = action.payload;
      switch (state.type) {
        case "day":
          const indexItem = state.todoList.day.findIndex((x) => x.id === id);
          if (indexItem !== -1) {
            state.todoList.day[indexItem].status = status;
            state.todoList.day[indexItem].display = display;
          }
          break;
        case "month":
          const indexItemMonth = state.todoList.month.findIndex((x) => x.id === id);
          if (indexItemMonth !== -1) {
            state.todoList.month[indexItemMonth].status = status;
            state.todoList.month[indexItemMonth].display = display;
          }
          break;
        case "year":
          const indexItemYear = state.todoList.year.findIndex((x) => x.id === id);
          if (indexItemYear !== -1) {
            state.todoList.year[indexItemYear].status = status;
            state.todoList.year[indexItemYear].display = display;
          }
          break;
        default:
          break;
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      switch (state.type) {
        case "day":
          const indexTodo = state.todoList.day.findIndex((x) => x.id === id);
          if (indexTodo !== -1) {
            state.todoList.day.splice(indexTodo, 1);
          }
          break;
        case "month":
          const indexTodoMonth = state.todoList.month.findIndex((x) => x.id === id);
          if (indexTodoMonth !== -1) {
            state.todoList.month.splice(indexTodoMonth, 1);
          }
          break;
        case "year":
          const indexTodoYear = state.todoList.year.findIndex((x) => x.id === id);
          if (indexTodoYear !== -1) {
            state.todoList.year.splice(indexTodoYear, 1);
          }
          break;
        default:
          break;
      }
    },
    deleteAllCompleted: (state, action) => {
      switch (state.type) {
        case "day":
          state.todoList.day = state.todoList.day.filter((todo) => todo.status !== StatusTodo.COMPLETED);
          break;
        case "month":
          state.todoList.month = state.todoList.month.filter((todo) => todo.status !== StatusTodo.COMPLETED);
          break;
        case "year":
          state.todoList.year = state.todoList.year.filter((todo) => todo.status !== StatusTodo.COMPLETED);
          break;
        default:
          break;
      }
    },
    filterTodo: (state, action) => {
      const { status } = action.payload;
      state.statusFilter = status;
      switch (state.type) {
        case "day":
          state.todoList.day = state.todoList.day.map((todo) => ({
            ...todo,
            display: status === StatusTodo.ALL || todo.status === status ? "block" : "none",
          }));
          break;
        case "month":
          state.todoList.month = state.todoList.month.map((todo) => ({
            ...todo,
            display: status === StatusTodo.ALL || todo.status === status ? "block" : "none",
          }));
          break;
        case "year":
          state.todoList.year = state.todoList.year.map((todo) => ({
            ...todo,
            display: status === StatusTodo.ALL || todo.status === status ? "block" : "none",
          }));
          break;
        default:
          break;
      }
    },
    setStatusTodo: (state, action) => {
      state.statusFilter = action.payload.statusFilter;
    },
    getEditTodo: (state, action) => {
      const { isEdit, todoEdit } = action.payload;
      state.editTodo.isEdit = isEdit;
      state.editTodo.todoEdit = todoEdit;
    },
  },
});

const { reducer, actions } = todoSlice;
// Export actions
export const {
  changeType,
  addTodo,
  editTodo,
  deleteTodo,
  updateStatusTodo,
  deleteAllCompleted,
  filterTodo,
  setStatusTodo,
  getEditTodo,
} = actions;

// Export reducer
export default reducer;
