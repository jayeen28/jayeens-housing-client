import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, List, ListItem, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
const DrawerNav = () => {
    const { user, userSignout } = useAuth();
    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </ListItemIcon>
                <Link to='/apartments'>Apartments</Link>
            </ListItem>
            {
                user.email ?
                    <>
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </ListItemIcon>
                            <Link to='/dashboard'>Dashboard</Link>
                        </ListItem>
                        <span style={{ color: 'black' }}> {user.displayName}</span>
                        <ListItem>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </ListItemIcon>
                            <Button onClick={userSignout} sx={{ color: 'black' }}>Sign out</Button>
                        </ListItem>
                    </>
                    :
                    <ListItem>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </ListItemIcon>
                        <Link to='/signin'> Sign In</Link>
                    </ListItem>
            }
        </List>
    );
};

export default DrawerNav;