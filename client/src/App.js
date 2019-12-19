import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './components/routes/Routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// layout
import LandinPage from './components/pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LandinPage} />
          {/* <Route component={Routes} /> */}
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
