import { CHANGE_THEME } from "../actionTypes";

export type ChangeThemeType = {
  type: typeof CHANGE_THEME;
};

export const changeTheme = (): ChangeThemeType => ({
  type: CHANGE_THEME,
});
