import React from 'react';
import { List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';

const DrawerNav = () => {
    const { user, userSignout } = useAuth();
    return (
        <List>
            {
                user.email &&
                <ListItem>
                    <span className="jbutton"><FontAwesomeIcon icon={faUserAlt} /> {user.displayName}</span>
                </ListItem>
            }
            <ListItem>
                <Link to='/apartments' className="jbutton">Apartments</Link>
            </ListItem>
            {
                user.email ?
                    <>
                        <ListItem>
                            <Link to='/dashboard' className="jbutton">Dashboard</Link>
                        </ListItem>
                        <ListItem>
                            <button onClick={userSignout} className="jbutton">
                                <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
                            </button>
                        </ListItem>
                    </>
                    :
                    <ListItem>
                        <Link to='/signin' className="jbutton"><FontAwesomeIcon icon={faSignInAlt} /> Sign In</Link>
                    </ListItem>
            }
        </List>
    );
};

export default DrawerNav;