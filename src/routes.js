import React from 'react';

import { Route, Switch } from 'react-router-dom';
import DashboardContent from './containers/content';
import Aboba from './containers/aboba';
import Login from './containers/login';
import Signup from './containers/signup';
import Registered from './containers/registered';
import ErrorPage from './containers/errorPage'
import CustomDash from './containers/CustomDash'
const BaseRouter = () => (
    <Switch>
        <Route exact path='/' component={Aboba} />
        <Route exact path='/dash' component={DashboardContent} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/registered' component={Registered} />
        <Route exact path='/customDash' component={CustomDash} />
        <Route path='*' component={ErrorPage} />
    </Switch>
)

export default BaseRouter;