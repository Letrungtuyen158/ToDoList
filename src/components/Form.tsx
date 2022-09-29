import moment from "moment";
import React from "react";
import { FORMAT_DATE } from "../constant/Form.constant";
import Styles from "./Form.module.css";

interface IProps {
  handlerSubmit(e: any): void;
}
const Form = (props: IProps) => {
  const { handlerSubmit } = props;
  const today = moment(new Date()).format(FORMAT_DATE);
  return (
    <form onSubmit={handlerSubmit} className={Styles.form}>
      <input
        type="text"
        className={Styles.input_title}
        name="title"
        placeholder="Add new task..."
      />
      {/* {error === "required" ? (
        <div className={Styles?.error}>{error}</div>
      ) : null} */}
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
            defaultValue={today}
            id="date"
            name="date"
          />
        </section>
        <section className={Styles.section}>
          <label className={Styles.label} htmlFor="">
            Piority
          </label>
          <select className={Styles.div_2_input} id="cars" name="piority">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </section>
      </div>
      <button className={Styles.button} type="submit">
        Add
      </button>
    </form>
  );
};

export default Form;
