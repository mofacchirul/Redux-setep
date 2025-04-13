import {configureStore} from "@reduxjs/toolkit"
import reducer from "./Todoslice"
const Stor = configureStore({
    reducer:{
        Todos:reducer
    }
})
export default Stor;