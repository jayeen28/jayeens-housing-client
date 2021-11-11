import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';

const NavMenu = ({ navItemContainer }) => {
    const { user, userSignout } = useAuth();
    return (
        <Box className={navItemContainer}>
            <Typography>
                <Link to='/apartments'>Apartments</Link>
                {
                    user.email ?
                        <>
                            <Link to='/dashboard'> Dashborad</Link>
                            <span style={{ color: 'black' }}> {user.displayName}</span>
                            <Button onClick={userSignout} sx={{ color: 'black' }}>Sign out</Button>
                        </>
                        :
                        <Link to='/signin'> Sign In</Link>
                }
            </Typography>
        </Box>
    );
};

export default NavMenu;