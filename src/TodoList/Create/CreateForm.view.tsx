import React, { memo } from "react";
import Form from "../../components/Form";
import { IPropsForm } from "../Form.type";
import Styles from "./CreateForm.module.css";

function CreateFrorm(props: IPropsForm) {
  const { handlerSubmit } = props;
  return (
    <div className={Styles.container_create}>
      <h1>New Task</h1>
      <Form handlerSubmit={handlerSubmit} />
    </div>
  );
}

export default memo(CreateFrorm);
