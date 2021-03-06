import { ActionCoinsTypes } from "../actions/coinsAction";
import { CoinType } from "../../types/types";
import { GET_COINS, ERROR_COINS } from "../actionTypes";

type InitialStateType = {
  list: Array<CoinType>;
  errorMessage: string;
};

const initialState: InitialStateType = {
  list: [],
  errorMessage: "",
};

export const coinsReducer = 
  (state = initialState, action: ActionCoinsTypes): InitialStateType => {
    switch (action.type) {
      case GET_COINS:
        return {
          list: action.coins,
          errorMessage: "",
        };
      case ERROR_COINS:
        return {
          list: [],
          errorMessage: action.errorMessage,
        };
      default:
        return state;
    }
  };
