import { isEmpty } from "ramda";
import React, { memo, useEffect, useState } from "react";
import Form from "../../components/Form";
import { searchArray, sortedArray } from "../../utils/form.common";
import { IPropsListTodo } from "../TodoList.type";
import Styles from "./List.module.css";
const TodoList = (props: IPropsListTodo) => {
  const [data, setData] = useState<any>([]);
  const {
    todoList,
    handlerDelete,
    handlerSubmit,
    handlerShowDetail,
    handlerEditTodo,
    active,
    deleteAllTodo,
    switchComplete,
    onChangeSearchTodo,
    keyValue,
    showBulk,
  } = props;

  sortedArray(todoList);

  useEffect(() => {
    const aa = searchArray(todoList, keyValue);
    setData(aa);
  }, [keyValue, todoList]);

  const newData = keyValue?.length > 0 ? data : todoList;
  return (
    <div className={Styles.container}>
      <div className={Styles.container_list}>
        <h1>To Do List</h1>
        <div className={Styles.list_item}>
          <input
            type="text"
            className={Styles.input_title}
            name="title"
            placeholder="Search..."
            onChange={onChangeSearchTodo}
          />
          {newData &&
            newData?.map((item: any) => (
              <div className={Styles.container_item} key={item?.idTodo}>
                <div className={Styles.item} key={item?.idTodo}>
                  <section className={Styles.section}>
                    <input
                      type="checkbox"
                      name="checkbox"
                      className={Styles.item_checkbox}
                      onChange={() => switchComplete(item?.idTodo)}
                      checked={item?.complete}
                    />
                    <div className={Styles.item_title}>{item?.title}</div>
                  </section>
                  <section className={Styles.section}>
                    <button
                      className={Styles.button_blue}
                      onClick={() => handlerShowDetail(item?.idTodo)}
                    >
                      Detail
                    </button>
                    <button
                      className={Styles.button_red}
                      onClick={() => handlerDelete(item?.idTodo)}
                    >
                      Remove
                    </button>
                  </section>
                </div>
                {active.includes(item?.idTodo) && (
                  <div className={Styles.detail}>
                    <Form
                      handlerSubmit={handlerSubmit}
                      item={item}
                      handlerEditTodo={handlerEditTodo}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {!isEmpty(showBulk) && (
        <div className={Styles.checkbox}>
          <div>Bulk Action:</div>
          <section className={Styles.section}>
            <button className={Styles.button_done}>Done</button>
            <button className={Styles.button_red} onClick={deleteAllTodo}>
              Remove
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default memo(TodoList);
