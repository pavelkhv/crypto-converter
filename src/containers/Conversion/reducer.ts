import { ConversionItemType } from "../../types/types";
import {
  MainActionsType,
  OptionDirectoryType,
  SET_OPTION,
  SET_CHART,
  SET_ERROR,
  SET_RATE,
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
  chartData: {
    labels: Array<string>,
    datasets: Array<number>,
  },
  loading: boolean;
  errorMessage: string;
  rate: number;
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
  chartData: {
    labels: [],
    datasets: [],
  },
  loading: false,
  errorMessage: "",
  rate: 1
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
            errorMessage: ""
          };
        }

        return {
          ...state,
          [dir]: {
            option: action.payload.option,
            value: state[dir].value,
          },
          errorMessage: ""
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
      case SET_CHART:
        return {
          ...state,
          chartData: {
            labels: action.payload.labels,
            datasets: action.payload.datasets
          }
        }
      case SET_LOADING:
        return {...state, loading: action.loading};
      case SET_ERROR:
        return {...state, errorMessage: action.errorMessage};
      case SET_RATE:
        return {...state, rate: action.rate};
      default:
        return state;
    }
  };
