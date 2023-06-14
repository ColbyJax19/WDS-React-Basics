import { useEffect, useState } from 'react';
import './styles.css';
import { NewToDoForm } from './NewToDoForm';
import TodoList from './TodoList';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewToDoForm onSubmit={addTodo} />
      <h1 className="header"> To Do List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
