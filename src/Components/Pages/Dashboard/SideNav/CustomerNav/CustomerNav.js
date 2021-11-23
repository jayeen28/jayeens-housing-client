import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalfAlt, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
const CustomerNav = () => {
    let { url } = useRouteMatch();
    return (
        <List>
            <ListItem>
                <Link to={`${url}/mybookings`} className="jbutton"><FontAwesomeIcon icon={faStoreAlt} /> My Bookings</Link>
            </ListItem>
            <ListItem>
                <Link to={`${url}/review`} className="jbutton"><FontAwesomeIcon icon={faStarHalfAlt} /> Review</Link>
            </ListItem>
        </List>
    );
};

export default CustomerNav;