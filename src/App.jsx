/**
 * Main App component
 */
import { Router } from "@reach/router";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import React, { useLayoutEffect } from "react";

import NotFoundPage from "./components/NotFoundPage";

import Profile from "./containers/Profile";
import ProfileStats from "./containers/ProfileStats";
import ErrorMessage from "./containers/ErrorMessage";

import "styles/global.scss";

const App = () => {
  useLayoutEffect(() => {
    disableSidebarForRoute("/profile/*");
  }, []);

  return (
    <>
      <Router>
        <Profile exact path="/profile/:handle" />
        <ProfileStats exact path="/profile/:handle/details" />
        <NotFoundPage path="/profile/" />
      </Router>
      <ErrorMessage />
    </>
  );
};

export default App;
