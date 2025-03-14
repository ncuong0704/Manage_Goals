import { createSlice } from "@reduxjs/toolkit";
import { StatusTodo } from "../../constants/todo";

// Tạo helper function để tránh lặp code
const createTodoItem = (payload) => ({
  id: Date.now(),
  name: payload.name,
  desc: payload.desc,
  begin: payload.begin,
  end: payload.end,
  status: payload.status,
  should: payload.should,
  display: payload.display,
});

const updateTodoItem = (todo, payload) => ({
  ...todo,
  name: payload?.name ?? todo.name,
  desc: payload.desc ?? todo.desc,
  begin: payload.begin ?? todo.begin,
  end: payload.end ?? todo.end,
  status: payload.status ?? todo.status,
  should: payload.should ?? todo.should,
  display: payload.display ?? todo.display,
});

const getInitialTodoList = () => {
  const savedTodos = localStorage.getItem("todoList");
  const parsedTodos = savedTodos ? JSON.parse(savedTodos) : { day: [], month: [], year: [] };
  return {
    day: parsedTodos.day || [],
    month: parsedTodos.month || [],
    year: parsedTodos.year || [],
  };
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    type: "day",
    statusFilter: StatusTodo.ALL,
    editTodo: {
      isEdit: false,
      todoEdit: {},
    },
    todoList: getInitialTodoList(),
  },
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
      state.statusFilter = StatusTodo.ALL;
      state.todoList[state.type] = state.todoList[state.type].map(todo => ({
        ...todo,
        display: "block",
      }));
    },

    addTodo: (state, action) => {
      state.todoList[state.type].push(createTodoItem(action.payload));
      state.editTodo = {
        isEdit: false,
        todoEdit: {},
      };
    },

    editTodo: (state, action) => {
      state.todoList[state.type] = state.todoList[state.type].map(todo =>
        todo.id === action.payload.id ? updateTodoItem(todo, action.payload) : todo
      );
    },

    updateStatusTodo: (state, action) => {
      const { id, status, display } = action.payload;
      const todoIndex = state.todoList[state.type].findIndex(x => x.id === id);
      if (todoIndex !== -1) {
        state.todoList[state.type][todoIndex].status = status;
        state.todoList[state.type][todoIndex].display = display;
      }
    },

    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.todoList[state.type] = state.todoList[state.type].filter(todo => todo.id !== id);
    },

    deleteAllCompleted: (state) => {
      state.todoList[state.type] = state.todoList[state.type].filter(
        todo => todo.status !== StatusTodo.COMPLETED
      );
    },

    filterTodo: (state, action) => {
      const status = action.payload.status;
      state.statusFilter = status;
      state.todoList[state.type] = state.todoList[state.type].map(todo => ({
        ...todo,
        display: status === StatusTodo.ALL || todo.status === status ? "block" : "none",
      }));
    },

    getEditTodo: (state, action) => {
      state.editTodo = action.payload;
    },
  },
});

const { reducer, actions } = todoSlice;
export const {
  changeType,
  addTodo,
  editTodo,
  updateStatusTodo,
  deleteTodo,
  deleteAllCompleted,
  filterTodo,
  getEditTodo,
} = actions;
export default reducer;
