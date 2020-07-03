import React, { useEffect, useReducer, useCallback, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { http } from "../../assets/ts/http";

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
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

type StateType = {
  theme: ThemeType;
};
type PropsFromReduxType = ConnectedProps<typeof connector>;

const mapStateToProps = (state: StateType) => ({
  theme: state.theme,
});
const connector = connect(mapStateToProps, {});

const Feeds: React.FC<PropsFromReduxType> = ({ theme }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [{ news, loading, order, categories, activeCategories },dispatch] = 
    useReducer(reducer, initialState);

  const setOrder = useCallback(
    (order: SortType) => dispatch(setSortAction(order)), []
  );
  const setCategories = useCallback(
    (category: string) => dispatch(setCategoriesAction(category)), []
  );

  // Get news
  useEffect(() => {
    const url = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
    const categories = activeCategories.join();

    dispatch(setLoadingAction(true));

    (async function getNews() {
      try {
        const body = await http(`${url}&sortOrder=${order}${categories ? "&categories=" + categories : ""}`);
        const data = body.Data;

        const news: Array<NewsType> = data.map((item: typeof data[0]): NewsType => {
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
      }catch {
        setErrorMessage("An error occurred while loading data. Try again later.")
      }
    })();
  }, [order, activeCategories]);

  // Get categories
  useEffect(() => {
    (async function getCategories() {
      try {
        const body = await http(`https://min-api.cryptocompare.com/data/news/categories`);
        const categories = body.map((item: typeof body[0]): string => item.categoryName);

        dispatch(getCategoriesAction(categories));
      }catch {
        setErrorMessage("An error occurred while loading data. Try again later.")
      }
    })();
  }, []);

  return (errorMessage ? <ErrorMessage message={errorMessage} /> :
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
