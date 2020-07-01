import { NewsType, SortType } from "../../types/types";

export const GET_NEWS = "GET_NEWS";
export const SET_LOADING = "SET_LOADING";
export const SET_SORT = "SET_SORT";
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

export type MainActionsType =
  | GetNewsActionType
  | SetLoadingActionType
  | SetSortActionType
  | GetCategoriesActionType
  | SetCategoriesActionType;

export const setLoadingAction = (loading: boolean): SetLoadingActionType => ({
  type: SET_LOADING,
  loading,
});

export const getNewsAction = (news: Array<NewsType>): GetNewsActionType => ({
  type: GET_NEWS,
  news,
});

export const setSortAction = (order: SortType): SetSortActionType => ({
  type: SET_SORT,
  order,
});

export const getCategoriesAction = 
  (categories: Array<string>): GetCategoriesActionType => ({
    type: GET_CATEGORIES,
    categories,
  });

export const setCategoriesAction = 
  (category: string): SetCategoriesActionType => ({
    type: SET_CATEGORIES,
    category,
  });
