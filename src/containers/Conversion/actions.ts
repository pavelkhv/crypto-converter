import { ConversionItemType } from "../../types/types";

export const SET_OPTION = "SET_OPTION";
export const CHANGE_VALUE = "CHANGE_VALUE";

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

export type MainActionsType = SetOptionActionType | ChangeValueActionType;

export const setOptionAction = 
  (option: ConversionItemType, direction: OptionDirectoryType): SetOptionActionType => ({
    type: SET_OPTION,
    payload: {
      option,
      direction,
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
