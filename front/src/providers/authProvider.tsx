import { createContext, useReducer } from "react";

interface AuthState {
  token: string | null;
  user: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

enum AUTH_TYPES {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type AuthAction =
  | { type: typeof AUTH_TYPES.LOGIN; token: string; user: string }
  | { type: typeof AUTH_TYPES.LOGOUT };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_TYPES.LOGIN:
      return { ...state };

    case AUTH_TYPES.LOGOUT:
      return { ...state };
  }
}

export const AuthProvider = ({ children }: any) => {
  const AuthContext = createContext<any>(null);
  const [state, dispatch] = useReducer(authReducer, initialState);
  //  const login = (token: any, user: any): void => {
  //   dispatch({ type: AUTH_TYPES.LOGIN, token, user });
  // };
  //  const logout = (): void => {
  //   dispatch({ type: AUTH_TYPES.LOGOUT });
  // };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
