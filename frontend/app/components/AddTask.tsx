import React, { useState } from "react";
import { Props, todotype } from "./TodoList";

const AddTask = ({ todolist, setTodos }: Props) => {
  const [text, setText] = useState("");
  const newTodo: todotype = {
    id: todolist.length + 1,
    text: text,
    finish: false,
  };
  const handleAddButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([newTodo, ...todolist]);
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
