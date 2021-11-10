import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu/NavMenu';

const Header = () => {
    return (
        <header className="header-section">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2, color: '#F95733' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/'>
                                Jayeen's Housing
                            </Link>
                        </Typography>
                        <NavMenu></NavMenu>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};

export default Header;