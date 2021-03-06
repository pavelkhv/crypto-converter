import { NewsType, SortType } from "../../types/types";
import {
  MainActionsType,
  GET_NEWS,
  SET_LOADING,
  SET_SORT,
  SET_ERROR,
  GET_CATEGORIES,
  SET_CATEGORIES,
} from "./actions";

type InitialStateType = {
  news: Array<NewsType>;
  loading: boolean;
  order: SortType;
  categories: Array<string>;
  activeCategories: Array<string>;
  errorMessage: string;
};

export const initialState: InitialStateType = {
  news: [],
  loading: false,
  order: "latest",
  categories: [],
  activeCategories: [],
  errorMessage: ""
};

export const reducer = 
  (state = initialState, action: MainActionsType): InitialStateType => {
    switch (action.type) {
      case GET_NEWS:
        return { ...state, news: action.news, errorMessage: "" };
      case SET_LOADING:
        return { ...state, loading: action.loading };
      case SET_SORT:
        return { ...state, order: action.order };
      case GET_CATEGORIES:
        return { ...state, categories: action.categories };
      case SET_CATEGORIES:
        let categories = [...state.activeCategories];

        if (categories.includes(action.category)) {
          const index = state.activeCategories.indexOf(action.category);
          categories.splice(index, 1);

          return { ...state, activeCategories: categories };
        }

        categories.push(action.category);

        return { ...state, activeCategories: categories };
      case SET_ERROR:
        return {...state, errorMessage: action.errorMessage};
      default:
        return state;
    }
  };
