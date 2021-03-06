import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page.js';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import PortfolioContainer from './portfolio/portfolio_container';
import TransactionsContainer from './transactions/transactions_container';


const App = () => (
  <div className="background">
    <NavBarContainer />
    <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
    <ProtectedRoute path='/portfolio' component={PortfolioContainer}></ProtectedRoute>
    <ProtectedRoute path='/transactions' component={TransactionsContainer}></ProtectedRoute>
  </div>
);

export default App;