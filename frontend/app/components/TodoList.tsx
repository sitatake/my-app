import React, { Dispatch, SetStateAction } from "react";
import axios from "axios";

export type todotype = {
  id: number;
  text: string;
  done: boolean;
};

export type createtodotype = {
  text: string;
  done: boolean;
};

export type Props = {
  todolist: todotype[];
  setTodos: Dispatch<SetStateAction<todotype[]>>;
};

const TodoList = ({ todolist, setTodos }: Props) => {
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editText, setEditText] = React.useState<string>("");

  const handleFinish = (id: number) => {
    const finishedtodo = todolist.find((_todo) => _todo.id === id);
    if (finishedtodo) {
      const newtodolist = todolist.filter((_todo) => _todo.id !== id);
      axios
        .put(`http://localhost:8000/todo/${id}/`, {
          text: finishedtodo.text,
          done: true,
        })
        .then(({ data }) => setTodos([data, ...newtodolist]));
    }
  };

  const handleEdit = (id: number, text: string) => {
    if (editingId === id) {
      const newtodolist = todolist.filter((_todo) => _todo.id !== id);
      axios
        .put(`http://localhost:8000/todo/${id}/`, {
          text: editText,
          done: false,
        })
        .then(({ data }) => setTodos([data, ...newtodolist]));
      setEditingId(null);
      setEditText("");
    } else {
      setEditingId(id);
      setEditText(text);
    }
  };

  return (
    <ul className="space-y-3">
      {todolist.map(
        (todo, index) =>
          !todo.done && (
            <li
              key={index}
              className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow-md"
            >
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border-2"
                />
              ) : (
                <span>
                  {todo.text}
                  {todo.id}
                </span>
              )}
              <div>
                <button
                  className="text-green-500 mr-3"
                  onClick={() => handleEdit(todo.id, todo.text)}
                >
                  {editingId === todo.id ? "Save" : "Edit"}
                </button>
                <button
                  className="text-red-500 "
                  onClick={() => handleFinish(todo.id)}
                >
                  Finish!
                </button>
              </div>
            </li>
          )
      )}
    </ul>
  );
};

export default TodoList;
