import React, { Fragment, useEffect, useState } from 'react';
import './LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loadUser, updateProfile } from '../../Action/UserAction';
import { useAlert } from 'react-alert';
import './UpdateProfile.css';
import Metadata from '../../Metadata';
import { UPDATE_PROFILE_RESET } from '../../Constant/UserConstant';

const UpdateProfiles = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    const { loading, isUpdated, error } = useSelector(state => state.profile);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        if (avatar) {
            myForm.set("avatar", avatar);
        }

        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            setAvatar(file);

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result); // This is for the preview
                }
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    
        if (isUpdated) {
            alert.success('Profile Updated Successfully');
            dispatch(loadUser());
            navigate('/account');
            dispatch({ type: UPDATE_PROFILE_RESET }); // Reset after redirect
        }
    }, [dispatch, error, alert, navigate, user, isUpdated]);
    
    return (
        <Fragment>
            <Metadata title="Update Profile" />
            <div className='updateProfileContainer'>
                <div className='updateProfileBox'>
                    <h2 className="updateProfileHeading">Update Profile</h2>

                    <form className='updateProfileForm' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                        <div className="updateProfileName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfilepEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProfileDataChange}
                            />
                        </div>
                        <input type="submit" value="Update Profile" className="updateProfileBtn" />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProfiles;
