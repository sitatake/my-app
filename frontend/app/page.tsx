"use client";

import AddTask from "./components/AddTask";
import TodoList, { todotype } from "./components/TodoList";
import { useState } from "react";

const todosDefault: todotype[] = [
  {
    id: 1,
    text: "プログラミング",
    finish: false,
  },
  {
    id: 2,
    text: "プログラミング",
    finish: false,
  },
  {
    id: 3,
    text: "プログラミング",
    finish: false,
  },
];

export default function Home() {
  const [todos, setTodos] = useState<todotype[]>(todosDefault);

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
