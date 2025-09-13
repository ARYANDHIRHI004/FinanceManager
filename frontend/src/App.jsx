import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./stores/useAuthStore";
import { Loader2Icon } from "lucide-react";
import LayoutLoggedIn from "./components/LayoutLoggedIn";
import BudgetPage from "./pages/BudgetPage";
import AccountsPage from "./pages/AccountsPage";
import HomePage from "./pages/HomePage";
import ExpancesPage from "./pages/ExpancesPage";
import IncomePage from "./pages/IncomePage";

const App = () => {
  const { authUser, getCurrentUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              !authUser ? <WelcomePage /> : <Navigate to={"/accounts"} />
            }
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/accounts"
            element={authUser ? <AccountsPage /> : <Navigate to={"/login"} />}
          />
        </Route>

        <Route path="/accounts" element={<LayoutLoggedIn/>}>
          <Route
            path="/accounts/:accountId"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/accounts/:accountId/budget"
            element={authUser ? <BudgetPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/accounts/:accountId/expences"
            element={authUser ? <ExpancesPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/accounts/:accountId/income"
            element={authUser ? <IncomePage /> : <Navigate to={"/login"} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
