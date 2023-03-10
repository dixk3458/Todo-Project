import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

  const handleAdd = todo => {
    //새로운 투두를 todos에 업데이트 해야한다.
    setTodos(prev => [...prev, todo]);
  };

  const handleUpdate = updated => {
    // 1. updated객체를 인자로 해서 status를 수정해주어야한다.
    setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = deleted => {
    // 1. deleted객체를 인자로 해서 todos 배열에서 해당 todo객체(deleted객체)를 삭제해줘야한다.
    setTodos(todos.filter(t => t.id !== deleted.id));
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map(item => {
          return (
            <Todo
              key={item.id}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          );
        })}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function readTodosFromLocalStorage() {
  console.log('readTodosFromLocalStorage');
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === 'all') {
    return todos;
  }
  return todos.filter(todo => todo.status === filter);
}
