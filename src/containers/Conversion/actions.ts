import { ConversionItemType } from "../../types/types";
import { http } from "../../assets/ts/http";

export const SET_OPTION = "SET_OPTION";
export const CHANGE_VALUE = "CHANGE_VALUE";
export const SET_CHART = "SET_CHART";
export const SET_ERROR = "SET_ERROR";
export const SET_RATE = "SET_RATE";
export const SET_LOADING = "SET_LOADING";

export type OptionDirectoryType = "from" | "to";

type SetOptionActionType = {
  type: typeof SET_OPTION;
  payload: {
    option: ConversionItemType;
    direction: OptionDirectoryType;
  };
};

type ChangeValueActionType = {
  type: typeof CHANGE_VALUE;
  payload: {
    valueFrom: string;
    valueTo: string;
  };
};

type SetChartActionType = {
  type: typeof SET_CHART;
  payload: {
    labels: Array<string>;
    datasets: Array<number>;
  };
};

type SetLoadingActionType = {
  type: typeof SET_LOADING;
  loading: boolean;
};

type SetErrorActionType = {
  type: typeof SET_ERROR;
  errorMessage: string;
};

type SetRateActionType = {
  type: typeof SET_RATE;
  rate: number;
};

export type MainActionsType = 
  | SetOptionActionType 
  | ChangeValueActionType 
  | SetChartActionType 
  | SetLoadingActionType
  | SetErrorActionType
  | SetRateActionType;

const setErrorAction = (): SetErrorActionType => ({
  type: SET_ERROR,
  errorMessage: "An error occurred while loading data. Try again later.",
});

const setRateAction = (rate: number): SetRateActionType => ({
  type: SET_RATE,
  rate,
});

export const setLoadingAction = (loading: boolean): SetLoadingActionType => ({
  type: SET_LOADING,
  loading,
});

export const setOptionAction = (
  option: ConversionItemType, 
  direction: OptionDirectoryType
): SetOptionActionType => ({
  type: SET_OPTION,
  payload: {
    option,
    direction,
  },
});

const setChartAction = 
  (labels: Array<string>, datasets: Array<number>): SetChartActionType => ({
    type: SET_CHART,
    payload: {
      labels,
      datasets,
    },
  });

export const changeValueAction = 
  (valueFrom: string, valueTo: string): ChangeValueActionType => ({
    type: CHANGE_VALUE,
    payload: {
      valueFrom,
      valueTo,
    },
  });


export const getHistory = 
  async (url: string, dispatch: (item: MainActionsType) => void) => {
    try {
      const body = await http(url);
      const data = body.Data.Data;

      let labels: Array<string> = [],
          datasets: Array<number> = [];

      data.forEach((item: typeof data[0]): void => {
        const date = new Date(item.time * 1000).toDateString();
        
        labels.push(date);
        datasets.push(item.high);
      });

      dispatch(setChartAction(labels, datasets));
    }catch {
      dispatch(setErrorAction());
    }
  }

export const getPrice = async (
  url: string, 
  dispatch: (item: MainActionsType) => void, 
  fromValue: string, 
  toOptionValue: string
) => {
  try {
    dispatch(setLoadingAction(true));
    
    const body = await http(url);
    const toFixedValue: string = (
      Math.floor(+fromValue * body[toOptionValue] * 1000000) / 1000000
    ).toString();

    dispatch(setRateAction(body[toOptionValue]));
    dispatch(changeValueAction(fromValue, toFixedValue));
    dispatch(setLoadingAction(false));
  }catch {
    dispatch(setErrorAction());
  }
}