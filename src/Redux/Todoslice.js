import { createSlice } from "@reduxjs/toolkit";

const todoslice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      if (typeof action.payload === "object") {
        state.push(action.payload); // for localStorage loading
      } else {
        state.push({ id: Date.now(), text: action.payload, comleted: false });
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.comleted = !todo.comleted;
      }
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoslice.actions;
export default todoslice.reducer;
