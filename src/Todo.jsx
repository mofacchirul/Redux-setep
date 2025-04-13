import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addTodo,toggleTodo,removeTodo} from "./Redux/Todoslice"


const Todo = () => {
    const [text,setText]=useState("")
    const [editid,seteditid]=useState(null);
    const Todos = useSelector( (state)=>state.Todos);
    const dispatch= useDispatch()

useEffect(()=>{
const savetodos= JSON.parse(localStorage.getItem("todos")) || [];
if(savetodos.length > 0 ){
    savetodos.forEach((todo) => {
        dispatch({
            type:"todos/loadFromStorage",
            payload:todo,
        })
        
    });
}
},[dispatch])

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(Todos));
},[Todos])


const HandleAddTodo =()=>{
    if(text.trim()){
        if(editid){
            dispatch(removeTodo(editid))
            dispatch(addTodo(`${text}`))
            seteditid(null)
        }
       else{
        dispatch(addTodo(text))
       }
       setText("")
    }
}

const HandleEditTodo = (todo)=>{
    setText(todo.text)
    seteditid(todo.id)
}



return (
    <div>
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center py-10">
                   <h1 className="text-4xl font-bold text-black mb-4">
                    Redux todo app
                   </h1>
                   <div className="w-11/12 mx-auto">
                    <div className="flex items-center space-x-3">
                        <input type="text"  placeholder="Type here" className="border py-2 rounded-lg px-2 focus:outline-none" onChange={(e)=>setText(e.target.value)}  />
                    <button onClick={HandleAddTodo} className="btn text-white btn-success">
                        {
                            editid ? "edit todo" : "add todo "
                        }
                    </button>
                    </div>
               
                   </div>
                   <ul>
            {
             Todos.map(todo=>(
                <li key={todo.id} className={`flex justify-between items-center p-3 rounded-lg shadow-md ${todo.comleted ? "bg-green-300" : "bg-gray-50"}`} >
                  <div className={`flex flex-col ${todo.comleted ? "line-through text-gray-500" : "text-gray-800"}` } onclick={()=>dispatch(toggleTodo(todo.id))}>
                    <span>
                        {todo.text}
                    </span>
                    <span>{new Date(todo.id).localStorage()}</span>
                  </div>
                  <div>
                    <button  onclick={()=> HandleEditTodo(todo)} className="btn btn-primary">Edit </button>
                    <button onclick={()=>dispatch(removeTodo(todo.id))} className="btn btn-error">Delete</button>
                  </div>
                </li>
             ))   
            }
                   </ul>


    </div>
    </div>
)

};

export default Todo;