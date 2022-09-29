import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import Create from "./Create";
import List from "./List";
import { v4 as uuidv4 } from "uuid";
import Styles from "./Form.module.css";
import { KEY_LOCALSTORE_TODO } from "../constant/Form.constant";
import { StateTodo } from "./Form.type";
import { InitalStateLocalStore } from "../utils/form.common";

const TodoListScreen = () => {
  const [todoList, setTodoList] = useState<StateTodo[]>(InitalStateLocalStore);
  const [active, setActive] = useState<any>([]);
  const [checkbox, setCheckBox] = useState<any>([]);

  useLayoutEffect(() => {
    localStorage.setItem(KEY_LOCALSTORE_TODO, JSON.stringify(todoList));
  });

  const handlerSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (e.target[0].value === "") {
        return;
      }
      const todoItems = {
        idTodo: uuidv4(),
        title: e.target[0].value,
        description: e.target[1].value,
        date: e.target[2].value,
        piority: e.target[3].value,
        complete: false,
      };
      setTodoList([...todoList, { ...todoItems }]);
      e.target.reset();
    },
    [todoList]
  );

  const handlerDelete = useCallback(
    (id: string) => {
      setTodoList(todoList.filter((item) => item?.idTodo !== id));
    },
    [todoList]
  );

  const handlerShowDetail = useCallback(
    (id: number) => {
      if (active?.includes(id)) {
        setActive(active.filter((i: number) => i !== id));
        return;
      }
      setActive([...active, id]);
    },
    [active]
  );

  const switchComplete = useCallback(
    (id: string) => {
      const newTodo = [...todoList];
      newTodo.forEach((todo) => {
        if (todo.idTodo === id) {
          todo.complete = !todo.complete;
        }
      });

      setTodoList(newTodo);
    },
    [todoList]
  );
  const deleteAllTodo = useCallback(() => {
    const newTodos = todoList.filter((todo) => {
      return todo.complete === false;
    });
    setTodoList(newTodos);
  }, [todoList]);

  return (
    <div className={Styles.container}>
      <Create handlerSubmit={handlerSubmit} />
      <List
        todoList={todoList}
        handlerDelete={handlerDelete}
        handlerSubmit={handlerSubmit}
        handlerShowDetail={handlerShowDetail}
        active={active}
        switchComplete={switchComplete}
        deleteAllTodo={deleteAllTodo}
      />
    </div>
  );
};

export default memo(TodoListScreen);
