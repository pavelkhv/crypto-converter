import React, { useEffect, useReducer, useCallback } from "react";
import { connect, ConnectedProps } from "react-redux";

import {
  setSortAction,
  setCategoriesAction,
  getCategories,
  getNews
} from "./actions";
import { reducer, initialState } from "./reducer";

import { ThemeType, SortType } from "../../types/types";
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const {news, loading, order, categories, activeCategories, errorMessage} = state;

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

    (async function() {
      await getNews(
        `${url}&sortOrder=${order}${categories ? "&categories=" + categories : ""}`, 
        dispatch
      );
    })();
  }, [order, activeCategories]);

  // Get categories
  useEffect(() => {
    const url = `https://min-api.cryptocompare.com/data/news/categories`;
    
    (async function() {
      await getCategories(url, dispatch);
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
