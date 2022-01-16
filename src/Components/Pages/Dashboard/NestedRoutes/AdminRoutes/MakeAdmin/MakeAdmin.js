import { TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import useSwal from '../../../../../Hooks/useSwal';
import './MakeAdmin.css';

const MakeAdmin = () => {
    const { handleSubmit, register, reset } = useForm();
    const { openSwal } = useSwal();
    const onSubmit = data => {
        fetch(`${process.env.REACT_APP_SERVER_URL}users/makeadmin?email=${data.adminEmail}`, {
            method: 'PUT'
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    openSwal('Admin has been added', 'success');
                    reset();
                }
                else if (data.matchedCount === 0) {
                    openSwal('No user found of this email in the database', 'warning');
                    reset();
                }
                else {
                    openSwal('Admin is not added. Please try again.', 'warning');
                }
            })
    }
    return (
        <div>
            <h2 className="jsectionhead">Lets make admin</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="makeadminform">
                <TextField label="email" {...register('adminEmail')} sx={{ borderColor: '#1d6b6f' }} required />
                <button variant='contained' type="submit" className="jbutton">Submit</button>
            </form>
        </div>
    );
};

export default MakeAdmin;