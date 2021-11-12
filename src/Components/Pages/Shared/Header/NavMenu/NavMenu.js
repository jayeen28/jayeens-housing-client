import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import './NavMenu.css';

const NavMenu = ({ navItemContainer }) => {
    const { user, userSignout, isLoading } = useAuth();
    if (isLoading) { return <CircularProgress sx={{ color: '#3D777A' }} /> }
    return (
        <Box className={navItemContainer}>
            <div className="nav-btns">
                <Link to='/apartments' className="jbutton">Apartments</Link>
                {
                    user.email ?
                        <>
                            <Link to='/dashboard' className="jbutton">Dashborad</Link>
                            <button onClick={userSignout} className="jbutton">Sign out</button>
                        </>
                        :
                        <Link to='/signin'>Sign In</Link>
                }
            </div>
        </Box>
    );
};

export default NavMenu;