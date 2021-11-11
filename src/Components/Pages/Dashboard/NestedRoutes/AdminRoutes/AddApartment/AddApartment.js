import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useForm } from 'react-hook-form';

const AddApartment = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch('https://obscure-refuge-52189.herokuapp.com/apartments/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <h2>Lets add an apartment</h2>
            <div className="add-apartment-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField label="Name" variant="outlined" {...register('name')} />
                    <TextField type="url" label="Image URL" variant="outlined" {...register('img')} />
                    <TextareaAutosize minRows={3} placeholder="Description" {...register('description')} />
                    <TextField type="number" label="Price" variant="outlined" {...register('price')} />
                    <Button type="submit">Add apartment</Button>
                </form>
            </div>
        </div>
    );
};

export default AddApartment;