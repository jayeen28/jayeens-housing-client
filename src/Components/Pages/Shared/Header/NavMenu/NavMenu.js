import { faClipboardCheck, faLaptopHouse, faSignInAlt, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';
import './NavMenu.css';

const NavMenu = ({ navItemContainer }) => {
    const { user, userSignout, isLoading } = useAuth();
    if (isLoading) { return <CircularProgress sx={{ color: '#3D777A' }} /> }
    return (
        <Box className={navItemContainer}>
            <div className="nav-btns">
                <Link to='/apartments' className="jbutton"><FontAwesomeIcon icon={faLaptopHouse} /> Apartments</Link>
                {
                    user.email ?
                        <>
                            <Link to='/dashboard' className="jbutton"><FontAwesomeIcon icon={faClipboardCheck} /> Dashborad</Link>
                            <span className="jbutton"><FontAwesomeIcon icon={faUserAlt} /> {user.displayName}</span>
                            <button onClick={userSignout} className="jbutton"><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</button>
                        </>
                        :
                        <Link to='/signin' className="jbutton"><FontAwesomeIcon icon={faSignInAlt} /> Sign in</Link>
                }
            </div>
        </Box>
    );
};

export default NavMenu;