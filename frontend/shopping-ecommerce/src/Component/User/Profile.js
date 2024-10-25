import React, { Fragment, useEffect } from 'react'
import Metadata from '../../Metadata'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Layout/Loader/Loader'
import './Profile.css'

const Profile = () => {

    const { user, loading, isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <Metadata title={user ? user.name + " | Profile" : "Profile"} />
                <div className='profileContainer' >
                    <div>
                        <h1>My Profile</h1>
                        <img src={user?.avatar?.url ? user.avatar.url : ''} alt={user ? user.name : ''} />
                        <Link to={"/me/update"}>Edit profile</Link>
                    </div>
                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user ? user.name : ''}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user ? user.email : ''}</p>
                        </div>
                        <div>
                            <h4>Joined On</h4>
                            <p>{user ? new Date(user.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</p>

                        </div>
                        <div>
                            <Link to="/orders">My Orders</Link>
                            <Link to="/password/update">Change Password</Link>
                        </div>

                    </div>
                </div></Fragment>}


        </Fragment>
    )
}

export default Profile
