import s from "./GridItem.module.css";

export const GridItem = ({ children }) => {
  return <li className={s.item}>{children}</li>;
};
