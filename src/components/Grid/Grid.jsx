import s from "./Grid.module.css";

export const Grid = ({ children }) => {
  return <ul className={s.list}>{children}</ul>;
};
