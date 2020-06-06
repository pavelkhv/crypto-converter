import { CoinType } from "../../types/types";

export const SET_CURRENCY = "SET_CURRENCY";
export const SET_PAGE = "SET_PAGE";
export const SET_LOADING = "SET_LOADING";
export const SET_SORT = "SET_SORT";

export type SortType = {
  name: keyof CoinType;
  direction: string;
};

type SetCurrencyActionType = {
  type: typeof SET_CURRENCY;
  currency: string;
};

type SetPageActionType = {
  type: typeof SET_PAGE;
  page: number;
};

type SetLoadingActionType = {
  type: typeof SET_LOADING;
  loading: boolean;
};

type SetSortActionType = {
  type: typeof SET_SORT;
  sort: keyof CoinType;
};

export type MainActionsType =
  | SetCurrencyActionType
  | SetPageActionType
  | SetLoadingActionType
  | SetSortActionType;

export const setCurrencyAction = (currency: string): SetCurrencyActionType => ({
  type: SET_CURRENCY,
  currency: currency,
});

export const setPageAction = (page: number): SetPageActionType => ({
  type: SET_PAGE,
  page: page,
});

export const setLoadingAction = (loading: boolean): SetLoadingActionType => ({
  type: SET_LOADING,
  loading: loading,
});

export const setSortAction = (sort: keyof CoinType): SetSortActionType => ({
  type: SET_SORT,
  sort: sort,
});
