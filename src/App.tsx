import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import { changeTheme } from "./redux/actions/themeAction";
import { ThemeType } from "./types/types";
import routes from "./routes";

import Header from "./components/Header/Header";

type StateType = { theme: ThemeType };
type PropsFromReduxType = ConnectedProps<typeof connector>;

const mapStateToProps = (state: StateType) => ({
  theme: state.theme
});
const connector = connect(mapStateToProps, { changeTheme });

const App: React.FC<PropsFromReduxType> = ({theme, changeTheme}) => {
  return (
    <Router>
      <div className={`app app_${theme}`}>
        <Header theme={theme} changeTheme={changeTheme} />
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

export default connector(App);
