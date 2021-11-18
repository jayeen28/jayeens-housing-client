import { CircularProgress, Container, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import defaultUserImg from '../../../images/defaultUser.jpg';
import './ProfilePage.css';

const ProfilePage = () => {
    const { updateUserProfileImage, user, isLoading, setisLoading, updateUserName } = useAuth();
    const { register, handleSubmit, setValue } = useForm();
    const showWantedImage = e => {
        const file = e.target.files[0];
        const profileImageDisplay = document.getElementById('profileImageDisplay');
        if (file) {
            const url = URL.createObjectURL(file)
            profileImageDisplay.src = url;
        }
    }

    setValue('displayName', user.displayName);
    setValue('email', user.email);
    setValue('phoneNumber', user.phoneNumber);

    const onSubmit = data => {
        setisLoading(true);
        const { displayName } = data;
        updateUserName(displayName);
        const image = data.img[0];
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            //SEND IMAGE TO IMGBB
            fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const imgUrl = data.data.url
                        updateUserProfileImage(imgUrl);
                    }
                    else {
                        alert('Something went wrong. Please try again. Sorry!!')
                    }
                })
        }
    }
    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page-body">
                <Container>
                    <div className="update-profile-informations" style={{ textAlign: "center" }}>
                        <h2>Update your profile informations</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="profileImage-input-form">
                            <div className="profile-information-setting">
                                <div className="profile-image-management">
                                    <div className="profile-image-show">
                                        <img src={user.photoURL || defaultUserImg} alt="profileImage" style={{ width: '100%', height: '100%' }} id="profileImageDisplay" />
                                    </div>
                                    <div className="profile-image-update">
                                        <label htmlFor="profileImage" className="jbutton">Update Image</label>
                                        <TextField type="file" {...register('img')} id="profileImage" className="jayeen-input" onChange={e => showWantedImage(e)} sx={{ opacity: '0' }} />
                                    </div>
                                </div>
                                <div className="profile-text-managements">
                                    <TextField label="Name" type="text" {...register('displayName')} defaultValue="" />
                                    <p>Email and phone number update are under construction</p>
                                    {/* <TextField label="Email" type="email" {...register('email')} defaultValue="" />
                                    <TextField label="Phone" type="number" {...register('phoneNumber')} defaultValue="" /> */}
                                </div>
                            </div>
                            {
                                isLoading && <CircularProgress sx={{ color: '#3D777A' }} />
                            }
                            <input type="submit" className="jbutton" value="Update" style={{ cursor: 'pointer' }} />
                        </form>
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;