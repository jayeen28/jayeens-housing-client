import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu/NavMenu';
import { makeStyles } from '@mui/styles';
import { Drawer, useTheme } from '@mui/material';
import DrawerNav from './NavMenu/DrawerNav/DrawerNav';

const Header = () => {
    const [drawerOpen, setdrawerOpen] = useState(false);
    const theme = useTheme();
    const useStyle = makeStyles({
        menuIcon: {
            [theme.breakpoints.up('sm')]: {
                display: 'none!important'
            }
        },
        navItemContainer: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        }
    })
    const { menuIcon, navItemContainer } = useStyle();
    return (
        <header className="header-section">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            className={menuIcon}
                            edge="start"
                            aria-label="menu"
                            onClick={() => setdrawerOpen(true)}
                            sx={{ mr: 2, color: '#3D777A' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/'>
                                Jayeen's Housing
                            </Link>
                        </Typography>
                        <NavMenu navItemContainer={navItemContainer}></NavMenu>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                open={drawerOpen}
                onClose={() => setdrawerOpen(false)}
            >
                <DrawerNav />
            </Drawer>
        </header>
    );
};

export default Header;