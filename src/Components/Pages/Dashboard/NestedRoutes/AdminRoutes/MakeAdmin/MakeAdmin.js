import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const MakeAdmin = () => {
    const { handleSubmit, register } = useForm();
    const onSubmit = data => {
        fetch(`https://obscure-refuge-52189.herokuapp.com/users/makeadmin?email=${data.adminEmail}`, {
            method: 'PUT'
        }).then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <h2>Lets make admin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField label="email" {...register('adminEmail')} />
                <Button variant='contained' type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default MakeAdmin;