import React from 'react';
import { List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './DrawerNav.css';

const DrawerNav = () => {
    const { user, userSignout } = useAuth();
    const userName = user.email?.split('@')[0];
    return (
        <List>
            {
                user.email &&
                <ListItem>
                    <Link to={`/profile/${userName}`} className="jbutton">
                        <div className="profile-info">
                            {user.photoURL ?
                                <div className="userPhotoPhone">
                                    <img src={user.photoURL} alt="userPhoto" style={{ width: '100%', height: '100%' }} />
                                </div>
                                : <FontAwesomeIcon icon={faUserAlt} />
                            } {userName}
                        </div>
                    </Link>
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