import React from "react";

import { ThemeType, SortType } from "../../types/types";

import SortButton from "./SortButton";
import CategoriesCheckbox from "./CategoriesCheckbox";

import "./feedsSidebar.scss";

type PropsType = {
  theme: ThemeType;
  order: SortType;
  categories: Array<string>;
  setOrder: (order: SortType) => void;
  setCategories: (category: string) => void;
};

const FeedsSidebar: React.FC<PropsType> = 
  ({ theme, order, categories, setOrder, setCategories}) => {
    return (
      <div className={`feeds-sidebar feeds-sidebar_${theme}`}>
        <h3 className="feeds-sidebar__title">Sorting:</h3>
        <div className="feeds-sort">
          <SortButton
            theme={theme}
            order={order}
            setOrder={setOrder}
            label="latest"
          />
          <SortButton
            theme={theme}
            order={order}
            setOrder={setOrder}
            label="popular"
          />
        </div>

        <h3 className="feeds-sidebar__title">Categories:</h3>

        <div className="feeds-categories">
          {categories.map((item: string) => 
            <CategoriesCheckbox key={item} label={item} setCategories={setCategories} />
          )}
        </div>
      </div>
    );
  };

export default FeedsSidebar;
