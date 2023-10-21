import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WellcomePage as WellcomePage } from "./page/welcome";
import { AuthProvider } from "./providers/authProvider";
import { AuthRoute } from "./routes/AuthRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { BalancePage } from "./page/balance";
import { ErrorPage } from "./page/error";
import { RecivePage } from "./page/recive";
import { RecoveryPage } from "./page/recovery";
import { RecoveryConfirmPage } from "./page/recovery-confirm";
import { SendPage } from "./page/send";
import { SettingsPage } from "./page/settings";
import { TransactionPage } from "./page/transaction";

import { NotificationsPage } from "./page/notifications";
import { SignIn } from "./container/sign-in";
import { SignUp } from "./container/sign-up";
import { SignUpConfirm } from "./container/sign-up-confirm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignUpConfirm />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recive"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
