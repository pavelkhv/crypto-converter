import { ConversionItemType } from "../../types/types";
import {
  MainActionsType,
  OptionDirectoryType,
  SET_OPTION,
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
};

export const reducer = 
  (state = initialState, action: MainActionsType): InitialStateType => {
    switch (action.type) {
      case SET_OPTION:
        const dir: OptionDirectoryType = action.payload.direction;
        return {
          ...state,
          [dir]: {
            option: action.payload.option,
            value: state[dir].value,
          },
        };
      case CHANGE_VALUE:
        return {
          from: {
            option: state.from.option,
            value: action.payload.valueFrom,
          },
          to: {
            option: state.to.option,
            value: action.payload.valueTo,
          },
        };
      default:
        return state;
    }
  };
