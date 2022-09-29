import moment from "moment";
import React, { memo } from "react";
import { FORMAT_DATE } from "../constant/Form.constant";
import { StateTodo } from "../TodoList/TodoList.type";
import Styles from "./Form.module.css";

interface IProps {
  handlerSubmit(e: any): void;
  item?: StateTodo;
  handlerEditTodo?(e: any, id: string): void;
}
const Form = (props: IProps) => {
  const { handlerSubmit, item, handlerEditTodo } = props;

  const today = moment(new Date()).format(FORMAT_DATE);

  return (
    <form
      onSubmit={
        item ? (e: any) => handlerEditTodo?.(e, item?.idTodo) : handlerSubmit
      }
      className={Styles.form}
    >
      <input
        type="text"
        className={Styles.input_title}
        name="title"
        placeholder="Add new task..."
        defaultValue={item ? item?.title : ""}
      />
      <div className={Styles.div_1}>
        <label className={Styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          className={Styles.div_1_description}
          id="description"
          rows={4}
          cols={10}
          name="description"
          defaultValue={item ? item?.description : ""}
        />
      </div>

      <div className={Styles.div_2}>
        <section className={Styles.section}>
          <label className={Styles.label} htmlFor="date">
            Dua Date
          </label>
          <input
            className={Styles.div_2_input}
            type="Date"
            defaultValue={item ? item.date : today}
            id="date"
            name="date"
          />
        </section>
        <section className={Styles.section}>
          <label className={Styles.label} htmlFor="">
            Piority
          </label>
          <select
            className={Styles.div_2_input}
            id="cars"
            name="piority"
            defaultValue={item ? item.piority : "Low"}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </section>
      </div>
      <button className={Styles.button} type="submit">
        {item ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default memo(Form);
