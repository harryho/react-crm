import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./pages/App";
import SignInPage from "./pages/SignInPage";

export const routes = (
  <div>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/login" component={SignInPage} />
    </Switch>
  </div>
);
