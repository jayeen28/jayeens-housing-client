import { faEdit, faHotel, faHouseUser, faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, ListItem } from '@mui/material';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const AdminNav = () => {
    let { url } = useRouteMatch();
    return (
        <List>
            <ListItem>
                <Link to={`${url}/manageallbookings`} className="jbutton"><FontAwesomeIcon icon={faEdit} /> Mange All Bookings</Link>
            </ListItem>
            <ListItem>
                <Link to={`${url}/addapartment`} className="jbutton"><FontAwesomeIcon icon={faLaptopHouse} /> Add Apartment</Link>
            </ListItem>
            <ListItem>
                <Link to={`${url}/makeadmin`} className="jbutton"><FontAwesomeIcon icon={faHouseUser} /> Make Admin</Link>
            </ListItem>
            <ListItem>
                <Link to={`${url}/manageapartments`} className="jbutton"><FontAwesomeIcon icon={faHotel} /> Mange Apartments</Link>
            </ListItem>
        </List>
    );
};

export default AdminNav;