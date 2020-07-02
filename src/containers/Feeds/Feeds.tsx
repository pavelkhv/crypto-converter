import React, { useEffect, useReducer, useCallback } from "react";
import { connect, ConnectedProps } from "react-redux";

import {
  getNewsAction,
  setLoadingAction,
  setSortAction,
  getCategoriesAction,
  setCategoriesAction,
} from "./actions";
import { reducer, initialState } from "./reducer";

import { ThemeType, NewsType, SortType } from "../../types/types";
import "./feeds.scss";

import FeedsList from "../../components/FeedsList/FeedsList";
import FeedsSidebar from "../../components/FeedsSidebar/FeedsSidebar";

type StateType = {
  theme: ThemeType;
};
type PropsFromReduxType = ConnectedProps<typeof connector>;

const mapStateToProps = (state: StateType) => ({
  theme: state.theme,
});
const connector = connect(mapStateToProps, {});

const Feeds: React.FC<PropsFromReduxType> = ({ theme }) => {
  const [{ news, loading, order, categories, activeCategories },dispatch] = 
    useReducer(reducer, initialState);

  const setOrder = useCallback(
    (order: SortType) => dispatch(setSortAction(order)), []
  );
  const setCategories = useCallback(
    (category: string) => dispatch(setCategoriesAction(category)), []
  );

  useEffect(() => {
    const url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
    const categories = activeCategories.join();

    dispatch(setLoadingAction(true));

    fetch(`${url}&sortOrder=${order}${categories ? "&categories=" + categories : ""}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.Data;
        const news: Array<NewsType> = data.map((item: typeof data[0]) => {
          return {
            id: item.id,
            date: item.published_on,
            img: item.imageurl,
            title: item.title,
            body: item.body,
            url: item.url,
            source: item.source,
          };
        });

        dispatch(getNewsAction(news));
        dispatch(setLoadingAction(false));
      });
  }, [order, activeCategories]);

  useEffect(() => {
    fetch("https://min-api.cryptocompare.com/data/news/categories")
      .then((res) => res.json())
      .then((res) => {
        const categories = res.map((item: typeof res[0]) => item.categoryName);

        dispatch(getCategoriesAction(categories));
      });
  }, []);

  return (
    <div className="feeds">
      <FeedsList theme={theme} news={news} loading={loading} />
      <FeedsSidebar
        theme={theme}
        setOrder={setOrder}
        setCategories={setCategories}
        categories={categories}
        order={order}
      />
    </div>
  );
};

export default connector(Feeds);
