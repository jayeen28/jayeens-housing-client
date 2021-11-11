import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

const MakeAdmin = () => {
    const { handleSubmit, register } = useForm();
    const onSubmit = data => {
        console.log(data)
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