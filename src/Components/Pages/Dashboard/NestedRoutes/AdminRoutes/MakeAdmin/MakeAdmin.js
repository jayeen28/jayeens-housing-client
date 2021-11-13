import { TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import './MakeAdmin.css';

const MakeAdmin = () => {
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = data => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/users/makeadmin?email=${data.adminEmail}`, {
            method: 'PUT'
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Admin has been added');
                    reset();
                }
                else {
                    alert('Something went wrong!')
                }
            })
    }
    return (
        <div>
            <h2 className="jsectionhead">Lets make admin</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="makeadminform">
                <TextField label="email" {...register('adminEmail')} sx={{ borderColor: '#1d6b6f' }} />
                <button variant='contained' type="submit" className="jbutton">Submit</button>
            </form>
        </div>
    );
};

export default MakeAdmin;