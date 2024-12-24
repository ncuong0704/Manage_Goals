import { createSlice } from "@reduxjs/toolkit";
import { StatusTodo } from "../../constants/todo";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    statusFilter: StatusTodo.ALL,
    editTodo: {
      isEdit: false,
      todoEdit: {},
    },
    todoList: localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push({
        id: Date.now(),
        name: action.payload.name,
        desc: action.payload.desc,
        status: action.payload.status,
        should: action.payload.should,
        display: action.payload.display,
      });
      state.editTodo = {
        isEdit: false,
        todoEdit: {},
      };
    },
    editTodo: (state, action) => {
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              name: action.payload?.name ?? todo.name,
              desc: action.payload.desc ?? todo.desc,
              status: action.payload.status ?? todo.status,
              should: action.payload.should ?? todo.should,
              display: action.payload.display ?? todo.display,
            }
          : todo
      );
    },
    updateStatusTodo: (state, action) => {
      const { id, status, display } = action.payload;
      const indexItem = state.todoList.findIndex((x) => x.id === id);
      if (indexItem !== -1) {
        state.todoList[indexItem].status = status;
        state.todoList[indexItem].display = display;
      }
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      const indexTodo = state.todoList.findIndex((x) => x.id === id);
      if (indexTodo !== -1) {
        state.todoList.splice(indexTodo, 1);
      }
    },
    deleteAllCompleted: (state, action) => {
      state.todoList = state.todoList.filter((todo) => todo.status !== StatusTodo.COMPLETED);
    },
    filterTodo: (state, action) => {
      const { status } = action.payload;
      state.statusFilter = status;
      state.todoList = state.todoList.map((todo) => ({
        ...todo,
        display: status === StatusTodo.ALL || todo.status === status ? "block" : "none",
      }));
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
  getAllTodo,
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
