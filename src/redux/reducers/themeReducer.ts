import { CHANGE_THEME } from "../actionTypes";
import { ChangeThemeType } from "../actions/themeAction";
import { ThemeType } from "../../types/types";

const initialState: ThemeType = "dark";

const themeReducer = 
  (state = initialState, action: ChangeThemeType): ThemeType => {
    switch (action.type) {
      case CHANGE_THEME:
        return state === "dark" ? "light" : "dark";
      default:
        return state;
    }
  };

export default themeReducer;
