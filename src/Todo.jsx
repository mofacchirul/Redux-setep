import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "./Redux/Todoslice";

const Todo = () => {
  const [text, setText] = useState("");
  const [editid, setEditid] = useState(null);
  const Todos = useSelector((state) => state.Todos);
  const dispatch = useDispatch();

  // Load from localStorage once
  useEffect(() => {
    const savetodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savetodos.length > 0) {
      savetodos.forEach((todo) => {
        dispatch(addTodo(todo));
      });
    }
  }, [dispatch]);

  // Save to localStorage whenever Todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Todos));
  }, [Todos]);

  const HandleAddTodo = () => {
    if (text.trim()) {
      if (editid) {
        dispatch(removeTodo(editid));
        dispatch(addTodo(text));
        setEditid(null);
      } else {
        dispatch(addTodo(text));
      }
      setText("");
    }
  };

  const HandleEditTodo = (todo) => {
    setText(todo.text);
    setEditid(todo.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-black mb-4">Redux Todo App</h1>
      <div className="w-11/12 mx-auto">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type here"
            className="border py-2 rounded-lg px-2 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={HandleAddTodo} className="btn text-white btn-success">
            {editid ? "Edit Todo" : "Add Todo"}
          </button>
        </div>
      </div>

      <ul className="mt-6 space-y-3 w-11/12 max-w-xl">
        {Todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-3 rounded-lg shadow-md ${
              todo.comleted ? "bg-green-300" : "bg-white"
            }`}
          >
            <div
              className={`cursor-pointer ${
                todo.comleted ? "line-through text-gray-500" : "text-gray-800"
              }`}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              <span>{todo.text}</span>
              <div className="text-sm text-gray-400">
                {new Date(todo.id).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => HandleEditTodo(todo)} className="btn btn-primary">
                Edit
              </button>
              <button onClick={() => dispatch(removeTodo(todo.id))} className="btn btn-error">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
