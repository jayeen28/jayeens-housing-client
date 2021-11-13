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
                    <TextField label="Name" variant="outlined" {...register('name')} />
                    <TextField type="url" label="Image URL" variant="outlined" {...register('img')} />
                    <TextField id="outlined-multiline-static" label="Multiline" multiline rows={4} {...register('description')} />
                    <TextField type="number" label="Price" variant="outlined" {...register('price')} />
                    <button type="submit" className="jbutton">Add apartment</button>
                </form>
            </div>
        </div>
    );
};

export default AddApartment;