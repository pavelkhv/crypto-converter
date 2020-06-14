import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import routes from "./routes";

import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.id}
                  path={route.path}
                  exact={route.exact}
                  render={props => <route.component {...props} />}
                />
              ))}
            </Switch>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
