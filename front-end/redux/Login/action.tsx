export const LoginActionTypes = {
  LOGGED: "LOGGED",
  LOGGEDOUT: "LOGGEDOUT",
};

export const LOGIN = () => {
  return { type: LoginActionTypes.LOGGED };
};

export const LOGOUT = () => {
  return { type: LoginActionTypes.LOGGEDOUT };
};
