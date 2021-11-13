import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import CustomerRoutes from './NestedRoutes/CustomerRoutes/CustomerRoutes';
import useAuth from '../../Hooks/useAuth';
import AdminRoutes from './NestedRoutes/AdminRoutes/AdminRoutes';
import SideNav from './SideNav/SideNav';
import { AppBar, Typography } from '@mui/material';
import './Dashboard.css'

const drawerWidth = 268;

function Dashboard(props) {
    const { user } = useAuth();
    const [currentUser, setcurrentUser] = React.useState({});
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isLoading, setisLoading] = React.useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    //CHECK IF THE USER ADMIN OR NOT
    React.useEffect(() => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/users?uid=${user.uid}`)
            .then(res => res.json())
            .then(data => setcurrentUser(data))
        setisLoading(false);
    }, [user])
    const drawer = (
        //SIEBAR NAV
        <SideNav isUserLoading={isLoading} currentUser={currentUser} />
        //
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#1d6b6f'
                }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div" sx={{ fontFamily: 'poppins' }}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {/* DASHBOARD BODY */}
                {
                    currentUser.role === 'admin' ? <AdminRoutes /> : <CustomerRoutes />
                }
                {/* // */}
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
