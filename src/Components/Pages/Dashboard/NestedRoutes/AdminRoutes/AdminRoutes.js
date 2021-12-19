import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ErrorRoute from '../ErrorRoute/ErrorRoute';
import AddApartment from './AddApartment/AddApartment';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import ManageAllBookings from './ManageAllBookings/ManageAllBookings';
import ManageApartments from './ManageApartments/ManageApartments';

const AdminRoutes = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/`}>
                <ManageAllBookings />
            </Route>
            <Route exact path={`${path}/manageallbookings`}>
                <ManageAllBookings />
            </Route>
            <Route path={`${path}/addapartment`}>
                <AddApartment />
            </Route>
            <Route path={`${path}/makeadmin`}>
                <MakeAdmin />
            </Route>
            <Route path={`${path}/manageapartments`}>
                <ManageApartments />
            </Route>
            <Route path={`${path}/*`}>
                <ErrorRoute />
            </Route>
        </Switch>
    );
};

export default AdminRoutes;