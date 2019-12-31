import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import LandingPage from './components/pages/LandingPage';
import Routes from './components/routes/Route';

import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from './actions/authAction';
import store from './store';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
