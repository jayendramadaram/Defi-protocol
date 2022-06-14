import { LoginActionTypes } from "./action";
import STATE, { ACTION } from "../../typings";

const LoginInitialState = {
  LOGGED: false,
};

export default function reducer(state = LoginInitialState, action: ACTION) {
  switch (action.type) {
    case LoginActionTypes.LOGGED:
      return { ...state, LOGGED: true };
    case LoginActionTypes.LOGGEDOUT:
      return { ...state, LOGGED: false };
    default:
      return state;
  }
}
