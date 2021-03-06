import React, { LazyExoticComponent } from 'react';
import { RouteProps } from "react-router-dom";

import Main from './containers/Main/Main';

const ConversionPage = React.lazy(() => import('./containers/Conversion/Conversion'));
const FeedsPage = React.lazy(() => import('./containers/Feeds/Feeds'));

type RouteType = {
  id: number,
  path: string,
  component: LazyExoticComponent<React.FC<RouteProps>> | React.FC,
  exact?: boolean
}

const routes: Array<RouteType> = [
  {id: 0, path: "/", exact: true, component: Main},
  {id: 1, path: "/conversion", component: ConversionPage},
  {id: 2, path: "/feeds", component: FeedsPage},
];

export default routes;