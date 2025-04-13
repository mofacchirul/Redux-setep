import {configureStore} from "@reduxjs/toolkit"
import TodosReducer from "./Todoslice";
const Stor = configureStore({
    reducer: {
        Todos: TodosReducer,
      },
})
export default Stor;