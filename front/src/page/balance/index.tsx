import { useContext, useState } from "react";

import { AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";

import "./index.css";
import { PageContent } from "../../component/page-content";
import { Balance } from "../../container/balance";

export const BalancePage = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [logoutState, setLogout] = useState(false);
  // const logout = () => {
  //   dispatch({
  //     type: AUTH_TYPES.LOGOUT,
  //   });
  //   setLogout(true);
  // };
  if (logoutState) return <Navigate to="/" />;
  return (
    <div className="page">
      <Balance />
    </div>
  );
};
