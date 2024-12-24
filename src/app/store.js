import { configureStore } from "@reduxjs/toolkit";
import reducerTodo from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    todo: reducerTodo,
  },
});
