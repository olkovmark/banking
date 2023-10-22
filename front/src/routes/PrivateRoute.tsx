import React, { useContext, useState } from "react";
import { AuthContext, AUTH_TYPES } from "../providers/authProvider";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.token) return <Navigate to={"/"} />;
  if (!state.user?.isConfirm) return <Navigate to="/signup-confirm" />;
  return <div>{children}</div>;
};
