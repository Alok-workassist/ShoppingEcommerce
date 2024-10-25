import React, { Fragment, useEffect, useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loadUser, updatePassword } from '../../Action/UserAction';
import { useAlert } from 'react-alert';
import Metadata from '../../Metadata';
import { UPDATE_PASSWORD_RESET } from '../../Constant/UserConstant';
import './UpdatePassword.css';

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function UpdatePassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { isUpdated, error } = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('null');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success('Profile Updated Successfully');
            dispatch(loadUser());
            navigate('/account');
            dispatch({ type: UPDATE_PASSWORD_RESET }); // Reset after redirect
        }
    }, [dispatch, error, alert, navigate, isUpdated]);
    return (
        <Fragment>
            <Metadata title="Update Profile" />
            <div className='updatePasswordContainer'>
                <div className='updatePasswordBox'>
                    <h2 className="updatePasswordHeading">Update Profile</h2>

                    <form
                        className="updatePasswordForm"
                        onSubmit={updatePasswordSubmit}
                    >
                        <div className="loginPassword">
                            <VpnKeyIcon />
                            <input
                                 type={showPassword ? 'text' : 'password'}
                                placeholder="Old Password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                             <button
                                type="button"
                                onClick={handleClickShowPassword}
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </button>
                        </div>

                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                           
                        </div>
                        <div className="loginPassword">
                            <LockIcon />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Change"
                            className="updatePasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
