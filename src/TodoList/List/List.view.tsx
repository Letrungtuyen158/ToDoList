import React, { memo } from "react";
import Form from "../../components/Form";
import { IPropsListTodo } from "../Form.type";
import Styles from "./List.module.css";
const TodoList = (props: IPropsListTodo) => {
  const {
    todoList,
    handlerDelete,
    handlerSubmit,
    handlerShowDetail,
    active,
    deleteAllTodo,
    switchComplete,
  } = props;

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
          />
          {todoList &&
            todoList.map((item) => (
              <div className={Styles.container_item} key={item?.idTodo}>
                <div className={Styles.item} key={item?.idTodo}>
                  <section className={Styles.section}>
                    <input
                      type="checkbox"
                      name="checkbox"
                      className={Styles.item_checkbox}
                      onChange={() => switchComplete(item?.idTodo)}
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
                    <Form handlerSubmit={handlerSubmit} />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {
        <div className={Styles.checkbox}>
          <div>Bulk Action:</div>
          <section className={Styles.section}>
            <button className={Styles.button_done}>Done</button>
            <button className={Styles.button_red} onClick={deleteAllTodo}>
              Remove
            </button>
          </section>
        </div>
      }
    </div>
  );
};

export default memo(TodoList);
