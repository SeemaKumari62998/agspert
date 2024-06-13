import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  username: "seema",
  password: "123",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(username, password) {
    if (username === FAKE_USER.username && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const Context = useContext(AuthContext);
  if (Context === undefined)
    throw new Error("The AuthContext was used OutSide of AuthProvider");
  return Context;
}
export { AuthProvider, useAuth };
