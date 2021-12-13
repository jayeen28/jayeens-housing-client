import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import './AddApartment.css';
import useSwal from '../../../../../Hooks/useSwal';

const AddApartment = () => {
    const { postSwal } = useSwal();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const url = 'https://afternoon-earth-46164.herokuapp.com/apartments/add';
        const formData = data;
        const successTitle = 'Apartment is added.';
        const errorTitle = 'Something went wrong.';
        postSwal(url, formData, successTitle, errorTitle, reset);
    }
    return (
        <div>
            <h2 className="jsectionhead">Lets add an apartment</h2>
            <div className="add-apartment-form-wrapper">
                <form onSubmit={handleSubmit(onSubmit)} className="add-apartment-form">
                    <TextField label="Name" variant="outlined" {...register('name')} required />
                    <TextField type="url" label="Image URL" variant="outlined" {...register('img')} required />
                    <TextField label="Description" multiline rows={4} {...register('description')} required />
                    <TextField type="number" label="Price" variant="outlined" {...register('price')} required />
                    <button type="submit" className="jbutton">Add apartment</button>
                </form>
            </div>
        </div>
    );
};

export default AddApartment;