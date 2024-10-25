import React, { Fragment, useEffect, useRef, useState } from 'react'
import './LoginSignup.css'
import { Link, useLocation } from 'react-router-dom';
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login, register } from '../../Action/UserAction';
import { useAlert } from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); // useNavigate hook for redirection

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Destructure state from Redux
  const { error, loading, message, isAuthenticated } = useSelector(state => state.user);

  // Redirect authenticated users to /account
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') ? searchParams.get('redirect').toLowerCase() : "/account";
  useEffect(() => {
    if (isAuthenticated && location.pathname == '/login') {
      navigate('/account'); // it will now redirect to `/shipping` correctly
    }
    if (isAuthenticated && redirect == 'shipping') {
      navigate(`/${redirect}`); // it will now redirect to `/shipping` correctly
    }
  
  }, [isAuthenticated, navigate, redirect, error, message, loading]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar); // Ensure avatar is a File object

    dispatch(register(myForm));
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (useLocation.pathname !== '/account') {
      if (message) {
        alert.success(message);
        dispatch(clearError());
      }
    }
  }, [dispatch, error, alert, message]);


  const registerDataChange = (e) => {
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
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
        <div className='LoginSignUpContainer'>
          <div className='LoginSignUpBox'>
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              <div className='loginEmail'>
                <MailOutlineIcon />
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className='loginPassword'>
                <LockOpenIcon />
                <input
                  type='password'
                  placeholder='Password'
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password</Link>
              <input type='submit' value="Login" className='loginBtn' />

            </form>
            <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
              <div className="signUpName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={user.name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={user.email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={user.password}
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>


          </div>
        </div>

      </Fragment>}
    </Fragment>
  )
}

export default LoginSignup
