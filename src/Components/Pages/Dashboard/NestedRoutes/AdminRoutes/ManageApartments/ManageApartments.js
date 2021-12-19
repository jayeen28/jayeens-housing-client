import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MApartmentBox from './MApartmentBox/MApartmentBox';

const ManageApartments = () => {
    const [apartments, setapartments] = useState([]);
    const [isloading, setisloading] = useState(true);
    const [render, setrender] = useState(false);
    useEffect(() => {
        fetch('https://afternoon-earth-46164.herokuapp.com/apartments')
            .then(res => res.json())
            .then(data => {
                setapartments(data);
                setisloading(false);
            })
    }, [render]);
    return (
        <div>
            <h2 className="jsectionhead">Manage apartments<small style={{ display: 'block', fontSize: '14px', color: '#1D6B6F' }}>Total {apartments.length} apartments</small></h2>
            <div className="apartment-boxes">
                {
                    isloading ?
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress sx={{ color: '#3D777A' }} />
                        </div>
                        :
                        <Grid container spacing={3}>
                            {
                                apartments.map(aprt => <MApartmentBox key={aprt._id} apartment={aprt}
                                    render={render} setrender={setrender} />)
                            }
                        </Grid>
                }
            </div>
        </div>
    );
};

export default ManageApartments;