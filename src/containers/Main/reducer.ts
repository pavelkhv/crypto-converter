import { MainActionsType, SET_CURRENCY, SET_PAGE, SET_LOADING, SET_SORT, SortType } from "./actions";

type InitialStateType = {
  currency: string,
  currentPage: number,
  loading: boolean,
  sort: SortType
}

export const initialState: InitialStateType = {
  currency: "USD",
  currentPage: 1,
  loading: false,
  sort: {
    name: "price",
    direction: "up"
  }
}

export const reducer = (state=initialState, action: MainActionsType): InitialStateType => {
  switch (action.type) {
    case SET_CURRENCY:
      return {...state, currency: action.currency};
    case SET_PAGE:
      return {...state, currentPage: action.page};
    case SET_LOADING:
      return {...state, loading: action.loading};
    case SET_SORT:
      let direction: string;

      if(state.sort.name === action.sort) {
        direction = state.sort.direction === "up" ? "down" : "up";
      } else {
        direction = "up";
      }

      return {
        ...state, 
        sort: {
          name: action.sort,
          direction: direction
        }
      };
    default:
      return state;
  }
}