import React from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated || token ? (
            <HomePage
              picture={user?.picture}
              email={user?.email}
              name={user?.name}
            />
          ) : (
            <SignInPage />
          )
        }
      />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
