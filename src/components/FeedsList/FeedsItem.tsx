import React from "react";

import { ThemeType, NewsType } from "../../types/types";

type PropsType = {
  theme: ThemeType;
  item: NewsType;
};

const FeedsItem: React.FC<PropsType> = ({ theme, item }) => {
  const style = { backgroundImage: `url(${item.img})` };

  return (
    <li className={`feeds-item feeds-item_${theme}`} key={item.id}>
      <div className="feeds-item__img" style={style}></div>
      <div className="feeds-item_wrapper">
        <a
          className={`feeds-item__title feeds-item__title_${theme}`}
          href={item.url}
          target="_blank"
        >
          <h2>{item.title}</h2>
        </a>
        <p className="feeds-item__footer">
          <span>{new Date().toDateString()}</span> 
          <span>{item.source}</span>
        </p>
        <p className="feeds-item__body">{item.body}</p>
      </div>
    </li>
  );
};

export default FeedsItem;
