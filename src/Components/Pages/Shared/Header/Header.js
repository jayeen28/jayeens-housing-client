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
import { Drawer, Grid, useTheme } from '@mui/material';
import DrawerNav from './NavMenu/DrawerNav/DrawerNav';
import jayeensHousing from '../../../../images/jayeens-housing.png';

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
                        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Grid item md={3}>
                                <Grid container sx={{ alignItems: 'center' }}>
                                    <Grid item xs={10}>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                            <Link to='/'>
                                                <div className="jayeens-housing-brand">
                                                    <img src={jayeensHousing} alt="JayeensHousingBrand" style={{ width: '100%' }} />
                                                </div>
                                            </Link>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                        <IconButton
                                            size="large"
                                            className={menuIcon}
                                            edge="start"
                                            aria-label="menu"
                                            onClick={() => setdrawerOpen(true)}
                                            sx={{ color: '#3D777A', border: '1px solid #3D777A', borderRadius: '15px' }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={9}>
                                <NavMenu navItemContainer={navItemContainer}></NavMenu>
                            </Grid>
                        </Grid>

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