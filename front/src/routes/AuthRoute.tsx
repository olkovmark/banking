import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }: any) => {
  const { state } = useContext(AuthContext);

  // if (state.token || state.user?.isConfirm) return <Navigate to="/balance" />;

  return <>{children}</>;
};
