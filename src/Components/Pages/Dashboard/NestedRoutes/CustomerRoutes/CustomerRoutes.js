import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
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
            <Route path={`${path}/pay`}>
                <Pay />
            </Route>
            <Route path={`${path}/review`}>
                <Review />
            </Route>
        </Switch>
    );
};

export default CustomerRoutes;