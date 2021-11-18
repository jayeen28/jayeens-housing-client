import React, { useState } from 'react';
import { faClipboardCheck, faLaptopHouse, faSignInAlt, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import useAuth from '../../../../Hooks/useAuth';
import './NavMenu.css';

const NavMenu = ({ navItemContainer }) => {
    const { user, userSignout, isLoading } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isLoading) { return <CircularProgress sx={{ color: '#3D777A' }} /> }
    return (
        <Box className={navItemContainer}>
            <div className="nav-btns">
                <Link to='/apartments' className="jbutton"><FontAwesomeIcon icon={faLaptopHouse} /> Apartments</Link>
                {
                    user.email ?
                        <>
                            <span>
                                <Button
                                    id="fade-button"
                                    aria-controls="fade-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >

                                    {
                                        user.photoURL ?
                                            '' :
                                            <span className="user-image-icon">
                                                <FontAwesomeIcon icon={faUserAlt} />
                                            </span>
                                    }

                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link to='/dashboard' className="jbutton"><FontAwesomeIcon icon={faClipboardCheck} /> Dashborad</Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <button onClick={userSignout} className="jbutton">
                                            <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
                                        </button>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}></MenuItem>
                                </Menu>
                            </span>
                        </>
                        :
                        <Link to='/signin' className="jbutton"><FontAwesomeIcon icon={faSignInAlt} /> Sign in</Link>
                }
            </div>
        </Box>
    );
};

export default NavMenu;