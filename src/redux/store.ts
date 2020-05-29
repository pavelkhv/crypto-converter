import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const configureStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const store = configureStore();

export default store;
