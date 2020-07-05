import { NewsType, SortType } from "../../types/types";
import { http } from "../../assets/ts/http";

export const GET_NEWS = "GET_NEWS";
export const SET_LOADING = "SET_LOADING";
export const SET_SORT = "SET_SORT";
export const SET_ERROR = "SET_ERROR";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";

type GetNewsActionType = {
  type: typeof GET_NEWS;
  news: Array<NewsType>;
};

type SetLoadingActionType = {
  type: typeof SET_LOADING;
  loading: boolean;
};

type SetSortActionType = {
  type: typeof SET_SORT;
  order: SortType;
};

type GetCategoriesActionType = {
  type: typeof GET_CATEGORIES;
  categories: Array<string>;
};

type SetCategoriesActionType = {
  type: typeof SET_CATEGORIES;
  category: string;
};

type SetErrorActionType = {
  type: typeof SET_ERROR;
  errorMessage: string;
};

export type MainActionsType =
  | GetNewsActionType
  | SetLoadingActionType
  | SetSortActionType
  | GetCategoriesActionType
  | SetCategoriesActionType
  | SetErrorActionType;

const setLoadingAction = (loading: boolean): SetLoadingActionType => ({
  type: SET_LOADING,
  loading,
});

const getNewsAction = (news: Array<NewsType>): GetNewsActionType => ({
  type: GET_NEWS,
  news,
});

const getCategoriesAction = 
  (categories: Array<string>): GetCategoriesActionType => ({
    type: GET_CATEGORIES,
    categories,
  });

const setErrorAction = (): SetErrorActionType => ({
  type: SET_ERROR,
  errorMessage: "An error occurred while loading data. Try again later.",
});

export const setCategoriesAction = 
  (category: string): SetCategoriesActionType => ({
    type: SET_CATEGORIES,
    category,
  });

export const setSortAction = (order: SortType): SetSortActionType => ({
  type: SET_SORT,
  order,
});

export const getNews = 
  async (url: string, dispatch: (item: MainActionsType) => void) => {
    try {
      dispatch(setLoadingAction(true));

      const body = await http(url);
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
      dispatch(setErrorAction());
    }
  }

export const getCategories = 
  async (url: string, dispatch: (item: MainActionsType) => void) => {
    try {
      const body = await http(url);
      const categories = body.map((item: typeof body[0]): string => item.categoryName);

      dispatch(getCategoriesAction(categories));
    }catch {
      dispatch(setErrorAction());
    }
  }