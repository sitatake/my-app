"use client";

import AddTask from "./components/AddTask";
import TodoList, { todotype } from "./components/TodoList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState<todotype[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/todo/").then(({ data }) => setTodos(data));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">
        Next.js todolist
      </h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-lg rounded-lg">
          <AddTask todolist={todos} setTodos={setTodos} />
          <TodoList todolist={todos} setTodos={setTodos} />
        </div>
      </div>
    </main>
  );
}
