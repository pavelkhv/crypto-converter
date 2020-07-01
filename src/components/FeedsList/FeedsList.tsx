import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { ThemeType, NewsType } from "../../types/types";

import Preloader from "../../components/Preloader/Preloader";
import FeedsItem from "./FeedsItem";

import "./feedsList.scss";

type PropsType = {
  theme: ThemeType;
  news: Array<NewsType>;
  loading: boolean;
};

const FeedsList: React.FC<PropsType> = ({ theme, news, loading }) => {
  const [loadedNews, setLoadedNews] = useState<NewsType[]>([]);

  const more = loadedNews.length === news.length ? false : true;
  const fetchMoreData = () =>
    setLoadedNews(news.slice(0, loadedNews.length + 5));

  useEffect(() => setLoadedNews(news.slice(0, 5)), [news]);

  return (
    <InfiniteScroll
      dataLength={loadedNews.length}
      next={fetchMoreData}
      hasMore={more}
      loader={""}
    >
      <ul className={`feeds-list feeds-list_${theme}`}>
        {loading 
          ? <Preloader theme={theme} /> 
          : loadedNews.map((item: NewsType) => (
              <FeedsItem theme={theme} item={item} key={item.id} />
            ))
        }
      </ul>
    </InfiniteScroll>
  );
};

export default FeedsList;
