import { CHANGE_THEME } from "../actionTypes";
import { ChangeThemeType } from "../actions/themeAction";
import { ThemeType } from "../../types/types";

const initialState: ThemeType = localStorage.getItem("theme") as ThemeType;

const themeReducer = 
  (state = initialState, action: ChangeThemeType): ThemeType => {
    switch (action.type) {
      case CHANGE_THEME:
        localStorage.setItem("theme", action.theme);
        return action.theme;
      default:
        return state;
    }
  };

export default themeReducer;
