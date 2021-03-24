import * as React from 'react';
import { Switch, RouteProps } from 'react-router-dom';
import link from 'rendererUtils/linkPaths'
import { buildRoutes } from 'renderer/Router';
import CreateAccount from './CreateAccount'
import EditAccount from './EditAccount'

const AccountRouter: React.FunctionComponent = () => {
  const routes: RouteProps[] = [
    { path: link.CreateAccount, component: CreateAccount },
    { path: link.EditAccount, component: EditAccount },
  ]

  return (
    <Switch>
      {buildRoutes(routes)}
    </Switch>
  )
}

export default AccountRouter