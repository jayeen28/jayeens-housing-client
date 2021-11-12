import { CircularProgress } from '@mui/material';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) { return <div className="spinner" style={{ textAlign: 'center' }}><CircularProgress sx={{ color: '#3D777A' }} /></div> }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (children)
                    :
                    (
                        <Redirect
                            to={{
                                pathname: '/signin',
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;