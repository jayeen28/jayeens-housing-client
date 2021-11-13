import React from 'react';
import Divider from '@mui/material/Divider';
import { List, ListItem, Typography } from '@mui/material';
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

            </List>
            {
                currentUser._id ?
                    <>
                        {
                            isLoading ? <CircularProgress sx={{ color: '#3D777A' }} /> :
                                <>
                                    {
                                        currentUser.role === 'admin' ? <AdminNav /> : <CustomerNav />
                                    }
                                </>

                        }
                    </>
                    :
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: '#3D777A' }} />
                    </div>
            }
            <Divider />
            <List>
                <ListItem>
                    <Link to='/' className="jbutton"><FontAwesomeIcon icon={faAngleDoubleLeft} /> Home</Link>
                </ListItem>
                <ListItem>
                    <button onClick={userSignout} sx={{ color: 'black' }} className="jbutton"><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</button>
                </ListItem>
            </List>
        </div>
    );
};

export default SideNav;