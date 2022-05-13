import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  AnyAction,
} from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import { createBrowserHistory, History } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { receptionsReducer } from "./reducers/receptionsReducer";
import { userReducer } from "./reducers/userReducer";
import { AppState } from "../tsTypes/interfaces";
import { loaderReducer } from "./reducers/loaderReducer";

export const history: History<unknown> = createBrowserHistory();

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const thunkMiddleware: ThunkMiddleware<AppState, AnyAction, any> = thunk;

const store = createStore(
  combineReducers({
    receptions: receptionsReducer,
    user: userReducer,
    loading: loaderReducer,
    router: connectRouter(history),
    form: formReducer,
  }),
  compose(
    applyMiddleware(thunkMiddleware, routerMiddleware(history)),
    composeEnhancers()
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
