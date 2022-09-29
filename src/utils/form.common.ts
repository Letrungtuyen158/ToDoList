import { KEY_LOCALSTORE_TODO } from "../constant/Form.constant";

export const InitalStateLocalStore = () => {
  const getLocoStore: any = localStorage.getItem(KEY_LOCALSTORE_TODO);
  const parseValue = JSON.parse(getLocoStore) || [];
  return parseValue;
};

export const sortedArray = (data: any[]) => {
  data?.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
};

export const searchArray = (data: any[], keyValue: string) => {
  if (keyValue) {
    const Filter = data?.filter((item) => {
      if (keyValue === "") {
        return item;
      } else {
        return item?.title.includes(keyValue);
      }
    });
    return Filter;
  }
  return data;
};
