import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    return (
        <Box>
            <Typography>
                <Link to='/explore'>Explore</Link>
                <Link to='/signin'> Sign In</Link>
            </Typography>
        </Box>
    );
};

export default NavMenu;