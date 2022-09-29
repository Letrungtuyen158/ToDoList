import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import Create from "./Create";
import List from "./List";
import { v4 as uuidv4 } from "uuid";
import Styles from "./TodoList.module.css";
import { KEY_LOCALSTORE_TODO } from "../constant/Form.constant";
import { StateTodo } from "./TodoList.type";
import { InitalStateLocalStore } from "../utils/form.common";

const TodoListScreen = () => {
  const [todoList, setTodoList] = useState<StateTodo[]>(InitalStateLocalStore);
  const [active, setActive] = useState<string[]>([]);
  const [showBulk, setShowBulk] = useState<string[]>([]);
  const [keyValue, setKeyValue] = useState<string>("");

  useLayoutEffect(() => {
    localStorage.setItem(KEY_LOCALSTORE_TODO, JSON.stringify(todoList));
  }, [todoList]);

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

  const handlerEditTodo = useCallback(
    (e: any, id: string) => {
      e.preventDefault();
      const newTodos = [...todoList];
      const target = e?.target?.elements;
      newTodos.forEach((todo) => {
        if (todo.idTodo === id) {
          todo.description = target?.description?.value;
          todo.title = target?.title?.value;
          todo.date = target?.date?.value;
          todo.piority = target?.piority?.value;
        }
      });
      setTodoList(newTodos);
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
    (id: string) => {
      if (active?.includes(id)) {
        setActive(active.filter((i) => i !== id));
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
      if (showBulk?.includes(id)) {
        setShowBulk(showBulk.filter((i) => i !== id));
        return;
      }
      setShowBulk([...showBulk, id]);
    },
    [showBulk, todoList]
  );

  const deleteAllTodo = useCallback(() => {
    const newTodos = todoList.filter((todo) => {
      return todo.complete === false;
    });
    setTodoList(newTodos);
    setShowBulk([]);
  }, [todoList]);

  const onChangeSearchTodo = useCallback((e: any) => {
    setKeyValue(e?.target?.value);
  }, []);

  return (
    <div className={Styles.container}>
      <Create handlerSubmit={handlerSubmit} />
      <List
        todoList={todoList}
        handlerDelete={handlerDelete}
        handlerSubmit={handlerSubmit}
        handlerShowDetail={handlerShowDetail}
        handlerEditTodo={handlerEditTodo}
        onChangeSearchTodo={onChangeSearchTodo}
        active={active}
        switchComplete={switchComplete}
        deleteAllTodo={deleteAllTodo}
        keyValue={keyValue}
        showBulk={showBulk}
      />
    </div>
  );
};

export default memo(TodoListScreen);
