import "./index.css";

import { MouseEvent, useContext, useEffect, useState } from "react";
import { BalanceHeader } from "../../component/balance-header";
import { BalanceActions } from "../../component/balance-actions";
import { getBalance } from "../../services/api";
import { AUTH_TYPES, AuthContext } from "../../providers/authProvider";
import { Navigate } from "react-router-dom";

export const Balance = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [nav, setNav] = useState("");

  const handlerSettings = () => {
    console.log("handler");
  };
  const handlerNotification = () => {
    console.log("handler");
  };
  const handlerRecive = () => {
    console.log("handler");
  };
  const handlerSend = () => {
    console.log("handler");
  };
  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    return setNav("/");
    dispatch({
      type: AUTH_TYPES.LOGOUT,
    });
  };

  const getData = async () => {
    if (!state.token) return logout();
    try {
      const res = await getBalance(state.token);
    } catch (error: any) {
      if (error?.status === 401) return logout();
    }
  };

  if (nav) return <Navigate to={nav} />;

  return (
    <div className="balance">
      <BalanceHeader
        handlerSettings={handlerSettings}
        handlerNotification={handlerNotification}
      />
      <span className="balance__amount">100 $</span>
      <BalanceActions handlerRecive={handlerRecive} handlerSend={handlerSend} />
    </div>
  );
};
