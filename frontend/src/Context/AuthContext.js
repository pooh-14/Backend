import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initalState = { user: null, token: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, token: action.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  function Login(userData, token) {
    localStorage.setItem("Mongo-users", JSON.stringify(userData));
    localStorage.setItem("User-token", JSON.stringify(token));
    dispatch({
      type: "LOGIN",
      payload: userData,
      token: token,
    });
  }

  function Logout() {
    localStorage.removeItem("Mongo-users");
    localStorage.removeItem("User-token");
    dispatch({
      type: "LOGOUT",
    });
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("Mongo-users"));
    const tokenData = JSON.parse(localStorage.getItem("User-token"));
    // console.log(userData, "userData")
    if (userData) {
      dispatch({
        type: "LOGIN",
        payload: userData,
        token: tokenData,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
