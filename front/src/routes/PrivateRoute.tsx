import React, { useContext, useState } from "react";
import { AuthContext, AUTH_TYPES } from "../providers/authProvider";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const { state, dispatch } = useContext(AuthContext);
  const [nav, setNav] = useState("");

  if (!state.token) return <Navigate to={nav} />;
  return <div>{children}</div>;
};
