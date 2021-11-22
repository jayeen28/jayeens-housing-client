import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Pay = () => {
    const { id } = useParams();
    const [isLoading, setisLoading] = useState(true);
    const [apartmentData, setapartmentData] = useState({});
    const { _id, name, img, description, price } = apartmentData;
    useEffect(() => {
        fetch(`https://afternoon-earth-46164.herokuapp.com/apartments/booked/${id}`)
            .then(res => res.json())
            .then(data => {
                setapartmentData(data);
                setisLoading(false);
            });
    }, [id])
    if (isLoading) { return 'LOADING CONTENTS . . . .' };
    return (
        <Container>
            <h2 className="jsectionhead">Pay for {id}</h2>
        </Container>
    );
};

export default Pay;