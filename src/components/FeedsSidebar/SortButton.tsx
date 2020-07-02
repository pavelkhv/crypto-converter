import React from "react";

import { ThemeType, SortType } from "../../types/types";

type PropsType = {
  theme: ThemeType;
  order: SortType;
  label: SortType;
  setOrder: (order: SortType) => void;
};

const SortButton: React.FC<PropsType> = ({ theme, order, label, setOrder }) => {
  return (
    <div
      onClick={() => setOrder(label)}
      className={`feeds-sort__item feeds-sort__item_${theme}
        ${order === label ? "feeds-sort__item_active" : ""}`}
    >
      {label}
    </div>
  );
};

export default SortButton;
