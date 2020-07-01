import { ConversionItemType } from "../../types/types";

export const SET_OPTION = "SET_OPTION";
export const CHANGE_VALUE = "CHANGE_VALUE";
export const SET_CHART = "SET_CHART";
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

export type MainActionsType = 
  | SetOptionActionType 
  | ChangeValueActionType 
  | SetChartActionType 
  | SetLoadingActionType;

export const setLoadingAction = (loading: boolean): SetLoadingActionType => ({
  type: SET_LOADING,
  loading,
});

export const setOptionAction = 
  (option: ConversionItemType, direction: OptionDirectoryType): SetOptionActionType => ({
    type: SET_OPTION,
    payload: {
      option,
      direction,
    },
  });

export const setChartAction = 
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
