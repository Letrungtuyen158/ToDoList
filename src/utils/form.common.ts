import { KEY_LOCALSTORE_TODO } from "../constant/Form.constant";

export const InitalStateLocalStore = () => {
  const getLocoStore: any = localStorage.getItem(KEY_LOCALSTORE_TODO);
  const parseValue = JSON.parse(getLocoStore) || [];
  return parseValue;
};
