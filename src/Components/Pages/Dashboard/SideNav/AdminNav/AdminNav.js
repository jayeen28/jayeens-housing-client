import { faEdit, faHotel, faHouseUser, faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, ListItem, ListItemIcon } from '@mui/material';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const AdminNav = () => {
    let { url } = useRouteMatch();
    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faEdit} />
                </ListItemIcon>
                <Link to={`${url}/manageallbookings`}>Mange All Bookings</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faLaptopHouse} />
                </ListItemIcon>
                <Link to={`${url}/addapartment`}>Add Apartment</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faHouseUser} />
                </ListItemIcon>
                <Link to={`${url}/makeadmin`}>Make Admin</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faHotel} />
                </ListItemIcon>
                <Link to={`${url}/manageapartments`}>Mange Apartments</Link>
            </ListItem>
        </List>
    );
};

export default AdminNav;