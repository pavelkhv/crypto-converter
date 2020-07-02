import { CHANGE_THEME } from "../actionTypes";
import { ThemeType } from "../../types/types";

export type ChangeThemeType = {
  type: typeof CHANGE_THEME;
  theme: ThemeType
};

export const changeTheme = (theme: ThemeType): ChangeThemeType => ({
  type: CHANGE_THEME,
  theme
});
