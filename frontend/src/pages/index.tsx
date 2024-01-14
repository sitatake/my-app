import Link from "next/link";
import TodoList from "@/component/todoList/todoList";
import { todostype, Props } from "@/component/todoList/todoList";

const todos: todostype[] = [
  {
    id: 1,
    text: "text",
    finish: true,
  },
  {
    id: 2,
    text: "text",
    finish: false,
  },
  {
    id: 3,
    text: "text",
    finish: false,
  },
];

const props: Props = {
  todolist: todos,
};

const index = () => {
  return (
    <>
      <TodoList {...props}></TodoList>
      <h1>aaa</h1>
    </>
  );
};

export default index;
