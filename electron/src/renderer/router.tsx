import * as React from 'react';
import { HashRouter, Route, RouteProps } from 'react-router-dom';
import link from 'rendererUtils/linkPaths'
import Home from './components/TestLinks/TestLinks';
import log from 'rendererUtils/logging'
import AccountRouter from 'components/account/AccountRouter'
import UserRouter from 'components/user/UserRouter'
import CategoryRouter from 'components/category/CategoryRouter'
/**
 * Builds a route component wrapper
 * @param route the route properties
 */
const buildRoute = (route: RouteProps) => {
  if (route.component) {
    const baseComponent = route.component

    // Create a component wrapper which logs a message when route is rendered
    route.component = () => {
      log.info("Routing to " + baseComponent.name)
      return React.createElement(baseComponent)
    }
  }

  return <Route {...route} key={route.path?.toString()}/>
}

/**
 * Builds an array of route components from route properties
 * @param routes an array of route properties
 */
export const buildRoutes = (routes: RouteProps[]) => {
  return routes.map(route => buildRoute(route))
}

/**
 * Build the main router
 */
export default function AppRouter(): JSX.Element {
  // Define main routes
  const routes: RouteProps[] = [
    { path: link.Home, component: Home, exact: true},
    { path: link.AccountSubpath, component: AccountRouter },
    { path: link.UserSubpath, component: UserRouter },
    { path: link.CategorySubpath, component: CategoryRouter },
  ]

  return (
    <HashRouter>
      {buildRoutes(routes)}
    </HashRouter>
  )
}