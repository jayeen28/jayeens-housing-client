import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MApartmentBox from './MApartmentBox/MApartmentBox';

const ManageApartments = () => {
    const [apartments, setapartments] = useState([]);
    const [isloading, setisloading] = useState(true);
    useEffect(() => {
        fetch('https://obscure-refuge-52189.herokuapp.com/apartments')
            .then(res => res.json())
            .then(data => {
                setapartments(data);
                setisloading(false);
            })
    }, [])
    return (
        <div>
            <h2>Total apartments: {apartments.length}</h2>
            <div className="apartment-boxes">
                {
                    isloading ?
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress sx={{ color: '#3D777A' }} />
                        </div>
                        :
                        <Grid container spacing={3}>
                            {
                                apartments.map(aprt => <MApartmentBox key={aprt._id} apartment={aprt} />)
                            }
                        </Grid>
                }
            </div>
        </div>
    );
};

export default ManageApartments;