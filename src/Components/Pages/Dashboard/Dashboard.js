import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import CustomerNav from './SideNav/CustomerNav/CustomerNav';
import CustomerRoutes from './NestedRoutes/CustomerRoutes/CustomerRoutes';
import { Button, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../Hooks/useAuth';
import { faAngleDoubleLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AdminNav from './SideNav/AdminNav/AdminNav';
import AdminRoutes from './NestedRoutes/AdminRoutes/AdminRoutes';


const drawerWidth = 240;

function Dashboard(props) {
    const { user, userSignout } = useAuth();
    const [currentUser, setcurrentUser] = React.useState({});
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    //CHECK IF THE USER ADMIN OR NOT
    React.useEffect(() => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/users?uid=${user.uid}`)
            .then(res => res.json())
            .then(data => setcurrentUser(data))
    }, [user])

    const drawer = (
        //SIEBAR NAV
        <div>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to='/'>
                        Jayeen's Housing
                    </Link>
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </ListItemIcon>
                    <Link to='/'>Back to home</Link>
                </ListItem>
            </List>
            {
                currentUser.role === 'admin' ? <AdminNav /> : <CustomerNav />
            }
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </ListItemIcon>
                    <Button onClick={userSignout} sx={{ color: 'black' }}>Sign out</Button>
                </ListItem>
            </List>
        </div>
        //
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
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
            </Toolbar>
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
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

                {/* DASHBOARD BODY */}
                <Box>
                    {
                        currentUser.role === 'admin' ? <AdminRoutes /> : <CustomerRoutes />
                    }
                </Box>
                {/* // */}
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
