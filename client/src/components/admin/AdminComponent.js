import React from 'react';
import { Route } from 'react-router-dom';
import AdminMenu from './Menu/AdminMenu';
import AdminHistory from './History/AdminHistory';
import AdminViewUser from './User/AdminViewUser';
import AdminDashboard from './Dashboard/AdminDashboard';

const componentItem = [
  {
    id: '/admin',
    component: AdminDashboard,
  },
  {
    id: '/admin/menu',
    component: AdminMenu,
  },
  {
    id: '/admin/client',
    component: AdminViewUser,
  },
  {
    id: '/admin/history',
    component: AdminHistory,
  },
];

const AdminComponents = ({ match }) =>
  componentItem.map(({ component, id }) =>
    match.url === id || match.url === `${id}/` ? (
      <Route exact component={component} key={id} />
    ) : null
  );

export default AdminComponents;
