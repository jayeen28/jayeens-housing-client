import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import './AddApartment.css';

const AddApartment = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        fetch('https://obscure-refuge-52189.herokuapp.com/apartments/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Apartment is added');
                    reset();
                }
                else {
                    alert('Something went wrong.');
                }
            })
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