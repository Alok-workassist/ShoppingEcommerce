import React, { Fragment, useEffect, useState } from 'react';
import './LoginSignup.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, resetPassword } from '../../Action/UserAction';
import { useAlert } from 'react-alert';
import Metadata from '../../Metadata';
import './ResetPassword.css';

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = ({match}) => {
    const dispatch = useDispatch();

    const alert = useAlert();
    const navigate = useNavigate();
    const { success, error } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');

    const { token } = useParams();

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmpassword", confirmPassword);

        dispatch(resetPassword(token,myForm));
    };


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (success) {
            alert.success('Password Reset Successfully');
            navigate('/login');
        }
    }, [dispatch, error, alert, navigate, success]);
    return (
        <Fragment>
            <Metadata title="Reset Password" />
            <div className='resetPasswordContainer'>
                <div className='resetPasswordBox'>
                    <h2 className="resetPasswordHeading">Reset Password</h2>

                    <form
                        className="resetPasswordForm"
                        onSubmit={resetPasswordSubmit}
                    >
                       

                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            className="resetPasswordBtn"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPassword
