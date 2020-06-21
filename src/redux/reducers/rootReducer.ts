import { combineReducers } from "redux";
import { coinsReducer } from "./coinsReducer";
import themeReducer from "./themeReducer";

export const rootReducer = combineReducers({ 
  coins: coinsReducer,
  theme: themeReducer
});

export type AppStoreType = ReturnType<typeof rootReducer>;

export default rootReducer;
