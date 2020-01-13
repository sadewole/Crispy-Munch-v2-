import React from 'react';
import { Switch, Route } from 'react-router-dom';
// layout

import MenuPage from '../pages/MenuPage';
import ShoppingHistory from '../pages/ShoppingHistory';
import Cart from '../pages/Cart';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

const Routers = () => {
  return (
    <section>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/menu' component={MenuPage} />
<<<<<<< HEAD
        <Route exact path='/cart' component={PrivateRoute(Cart)} />
=======
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
        <Route
          exact
          path='/history'
          component={PrivateRoute(ShoppingHistory)}
        />
<<<<<<< HEAD
=======
        <Route exact path='/cart' component={PrivateRoute(Cart)} />
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
        <Route exact path='/admin' component={PrivateRoute(Admin)} />
        <Route exact path='/admin/:slum' component={PrivateRoute(Admin)} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routers;
