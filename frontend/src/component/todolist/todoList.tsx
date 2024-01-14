import Link from "next/link";

export type todostype = {
  id: number;
  text: string;
  finish: boolean;
};

export type Props = {
  todolist: todostype[];
};

const TodoList = ({ todolist }: Props) => {
  return (
    <ul>
      {todolist.map(
        (todo) => todo.finish && <li key={todo.id}>{todo.text}</li>
      )}
    </ul>
  );
};

export default TodoList;
