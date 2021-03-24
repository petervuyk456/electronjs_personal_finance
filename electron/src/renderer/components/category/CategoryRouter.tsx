import * as React from 'react';
import { Switch, RouteProps } from 'react-router-dom';
import link from 'rendererUtils/linkPaths'
import { buildRoutes } from 'renderer/Router';
import CreateCategory from './CreateCategory'
import EditCategory from './EditCategory'

const AccountRouter: React.FunctionComponent = () => {
  const routes: RouteProps[] = [
    { path: link.CreateCategory, component: CreateCategory },
    { path: link.EditCategory, component: EditCategory },
  ]

  return (
    <Switch>
      {buildRoutes(routes)}
    </Switch>
  )
}

export default AccountRouter