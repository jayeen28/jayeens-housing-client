import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ErrorRoute from '../ErrorRoute/ErrorRoute';
import MyBookings from './MyBookings/MyBookings';
import Pay from './Pay/Pay';
import Review from './Review/Review';

const CustomerRoutes = () => {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <MyBookings />
            </Route>
            <Route path={`${path}/mybookings`}>
                <MyBookings />
            </Route>
            <Route path={`${path}/pay/:id`}>
                <Pay />
            </Route>
            <Route path={`${path}/review`}>
                <Review />
            </Route>
            <Route path={`${path}/*`}>
                <ErrorRoute />
            </Route>
        </Switch>
    );
};

export default CustomerRoutes;