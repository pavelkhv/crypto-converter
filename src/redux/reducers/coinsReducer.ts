import { ActionCoinsTypes } from "../actions/index";
import { CoinType } from "../../types/types";

const initialState: Array<CoinType> = [
  {
    id: "",
    name: "",
    fullName: "",
    iconUrl: "",
    price: "",
    high24: "",
    low24: "",
    open24: "",
    change24: "",
    change24Hour: "",
  },
];

export const coinsReducer = (state = initialState, action: ActionCoinsTypes): Array<CoinType> => {
  switch (action.type) {
    case "GET_COINS":
      return [...action.payload.coins];
    default:
      return state;
  }
};
