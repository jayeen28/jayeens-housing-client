import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faStarHalfAlt, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
const CustomerNav = () => {
    let { url } = useRouteMatch();
    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faStoreAlt} />
                </ListItemIcon>
                <Link to={`${url}/mybookings`}>My Bookings</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faCreditCard} />
                </ListItemIcon>
                <Link to={`${url}/pay`}>Pay</Link>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                </ListItemIcon>
                <Link to={`${url}/review`}>Review</Link>
            </ListItem>
        </List>
    );
};

export default CustomerNav;