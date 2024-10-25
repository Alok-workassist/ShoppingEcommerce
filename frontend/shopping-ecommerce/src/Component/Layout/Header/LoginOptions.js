import React, { Fragment, useState } from 'react'
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Backdrop from "@material-ui/core/Backdrop";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginOptions = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const options = [
        { icons: <HomeIcon />, name: "Home", func: home },
        { icons: <LockOpenIcon />, name: "Login", func: login },
        {
            icons: 
                <ShoppingCartIcon
                    style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
                />
            , name: `Cart(${cartItems.length})`, func: cart
        }

    ];
    function home() {
        navigate("/");
    }
    function login() {
        navigate("/login");
    }
    function cart() {
        navigate("/cart");
    }


    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src="/profile.webp"
                        alt="Profile"
                    />
                }
            >
                {options.map((option) => (
                    <SpeedDialAction
                        key={option.name} // Added a key prop
                        icon={option.icons} // Corrected icon usage
                        tooltipTitle={option.name}
                        tooltipOpen={window.innerWidth < 600 ? true : false}
                        onClick={option.func} // Corrected function reference
                    />
                ))}
            </SpeedDial>

        </Fragment>
    );
};
export default LoginOptions
