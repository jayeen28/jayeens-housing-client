import React from 'react';
import Divider from '@mui/material/Divider';
import { Button, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import useAuth from '../../../Hooks/useAuth';
import AdminNav from './AdminNav/AdminNav';
import CustomerNav from './CustomerNav/CustomerNav';
import { CircularProgress } from '@mui/material';

const SideNav = ({ isLoading, currentUser }) => {
    const { userSignout } = useAuth();
    return (
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
                currentUser._id ?
                    <>
                        {
                            isLoading ? <CircularProgress /> :
                                <>
                                    {
                                        currentUser.role === 'admin' ? <AdminNav /> : <CustomerNav />
                                    }
                                </>

                        }
                    </>
                    :
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: '#757575' }} />
                    </div>
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
    );
};

export default SideNav;