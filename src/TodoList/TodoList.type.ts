export type StateTodo = {
  idTodo: string;
  title: string;
  description: string;
  date: string;
  piority: string;
  complete: boolean;
};

export interface IPropsForm {
  handlerSubmit(e: any): void;
}

export interface IPropsListTodo extends IPropsForm {
  todoList: StateTodo[];
  handlerDelete(id: string): void;
  handlerShowDetail(id: any): void;
  handlerEditTodo: any;
  switchComplete(e: any): void;
  deleteAllTodo(): void;
  onChangeSearchTodo(e: any): void;
  active: string[];
  keyValue: string;
  showBulk: string[];
}
