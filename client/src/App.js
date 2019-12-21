import React, { Fragment } from 'react';
import './App.css';
// import Routes from './components/routes/Routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// layout
import LandingPage from './components/pages/LandingPage';
import MenuPage from './components/pages/MenuPage';
import ShoppingHistory from './components/pages/ShoppingHistory';
import Cart from './components/pages/Cart';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/menu' component={MenuPage} />
          <Route exact path='/history' component={ShoppingHistory} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />

          {/* <Route component={Routes} /> */}
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
