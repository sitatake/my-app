import React, { useState } from "react";
import { Props, createtodotype } from "./TodoList";
import axios from "axios";

const AddTask = ({ todolist, setTodos }: Props) => {
  const [text, setText] = useState("");
  const newTodo: createtodotype = {
    text: text,
    done: false,
  };
  const handleAddButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/todo/", newTodo)
      .then((res) => setTodos([res.data, ...todolist]));
    setText("");
  };

  return (
    <form onSubmit={handleAddButton} className="mb-4 space-y-3">
      <input
        type="text"
        className="w-full border px-4 py-2 rouded-lg focus:outline-none focus:border-blue-400"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200">
        AddTask
      </button>
    </form>
  );
};

export default AddTask;
