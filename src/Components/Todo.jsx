import { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";
const Todo = () => {
  // const [todoList, setTodoList] = useState([]); //empty array so we can store multiple todos
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  ); // if data present in local storage, String data convert into array and store as initial state value else store as empty array
  //initial value taking from localstorage so even after refresh the page Previous todos are display on page

  const inputRef = useRef();

  // ^ create 
  const add = () => {
    const inputText = inputRef.current.value.trim(); //trim is used to remove extra space
    console.log(inputText);

    if (!inputText) {
      // If inputText is empty, stop execution
      alert("Task cannot be empty!");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = ""; //after adding clear the input field
  };

  //^Delete
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id != id));
  };

  // ^Update
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo; //returning other item without changing the status
      });
    });
  };

  // ^how we will check that isCompleted data is updated or not
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList)); // Whenever refresh the page the data/todos are remove hence store it in localstorage  //data store in String formate only
    // here we have array so convert it into string using stringify
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl pl-2 pr-2">
      
      {/* -------- Title -------- */}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl form-semibold">To-Do List</h1>
      </div>

      {/* --------- input box  -------*/}
      <div className="flex item-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-blue-900 w-32 h-14 text-white text-lg font-medium cursor-pointer "
        >
          ADD +{" "}
        </button>
      </div>

      {/* ------------ Todo list ---------- */}

      <div>
        {todoList?.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
