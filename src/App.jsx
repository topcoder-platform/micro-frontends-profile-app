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
    disableSidebarForRoute("/members/*");
  }, []);

  return (
    <>
      <Router>
        <Profile exact path="/members/:handle" />
        <ProfileStats exact path="/members/:handle/details" />
        <NotFoundPage path="/members/" />
      </Router>
      <ErrorMessage />
    </>
  );
};

export default App;
