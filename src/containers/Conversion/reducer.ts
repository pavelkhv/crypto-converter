import { ConversionItemType } from "../../types/types";
import {
  MainActionsType,
  OptionDirectoryType,
  SET_OPTION,
  SET_LOADING,
  CHANGE_VALUE,
} from "./actions";

type InitialStateType = {
  from: {
    option: ConversionItemType;
    value: string;
  };
  to: {
    option: ConversionItemType;
    value: string;
  };
  loading: boolean;
};

export const initialState: InitialStateType = {
  from: {
    option: {
      value: "BTC",
      label: "BTC - Bitcoin",
    },
    value: "1",
  },
  to: {
    option: {
      value: "USD",
      label: "USD - Dollar",
    },
    value: "0",
  },
  loading: false,
};

export const reducer = 
  (state = initialState, action: MainActionsType): InitialStateType => {
    switch (action.type) {
      case SET_OPTION:
        const dir: OptionDirectoryType = action.payload.direction,
              dirOpposite: OptionDirectoryType = dir === "from" ? "to" : "from";

        if(action.payload.option.value === state[dirOpposite].option.value) {
          return {
            ...state,
            from: {
              ...state.from,
              option: state.to.option,
            },
            to: {
              ...state.to,
              option: state.from.option,
            },
          };
        }

        return {
          ...state,
          [dir]: {
            option: action.payload.option,
            value: state[dir].value,
          },
        };
      case CHANGE_VALUE:
        return {
          ...state,
          from: {
            ...state.from,
            value: action.payload.valueFrom,
          },
          to: {
            ...state.to,
            value: action.payload.valueTo,
          },
        };
      case SET_LOADING:
        return {...state, loading: action.loading};
      default:
        return state;
    }
  };
