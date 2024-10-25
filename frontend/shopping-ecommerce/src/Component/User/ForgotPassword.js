import React, { Fragment, useEffect, useState } from 'react';
import './LoginSignup.css';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, forgotPassword } from '../../Action/UserAction';
import { useAlert } from 'react-alert';
import './ForgotPassword.css';
import Metadata from '../../Metadata';
import Loader from '../Layout/Loader/Loader'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, message, error } = useSelector(state => state.forgotPassword);
    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (message) {
            alert.success(message);
            dispatch(clearError());
        }
    }, [dispatch, error, alert, message]);

    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <Metadata title="Forgot Password" />
                <div className='updatePasswordContainer'>
                    <div className='updatePasswordBox'>
                        <h2 className="updatePasswordHeading">Forgot Password</h2>
                        <form
                            className="updatePasswordForm"
                            onSubmit={forgotPasswordSubmit}
                        >

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
                            <input
                                type="submit"
                                value="Change"
                                className="updatePasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </Fragment>)
            }
        </Fragment >

    )
}

export default ForgotPassword
