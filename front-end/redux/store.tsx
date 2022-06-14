import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import login from "./Login/reducer";
import { STATE } from "../typings";
import { configureStore } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({
  login,
});

const initStore = () => {
  return configureStore({
    reducer: { login: login },
  });
};

export const wrapper = createWrapper<Store<STATE>>(initStore);
