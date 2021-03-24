import * as React from 'react';
import { Switch, RouteProps } from 'react-router-dom';
import link from 'rendererUtils/linkPaths'
import { buildRoutes } from 'renderer/Router';
import CreateUser from './CreateUser'
import EditUser from './EditUser'

const UserRouter: React.FunctionComponent = () => {
  const routes: RouteProps[] = [
    { path: link.CreateUser, component: CreateUser },
    { path: link.EditUser, component: EditUser },
  ]

  return (
    <Switch>
      {buildRoutes(routes)}
    </Switch>
  )
}

export default UserRouter