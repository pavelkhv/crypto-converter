import { combineReducers } from "redux";
import { coinsReducer } from "./coinsReducer";

export const rootReducer = combineReducers({ coins: coinsReducer });

export type AppStoreType = ReturnType<typeof rootReducer>;

export default rootReducer;
