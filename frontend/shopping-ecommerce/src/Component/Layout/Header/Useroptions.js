import React, { Fragment, useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Action/UserAction';
import Backdrop from "@material-ui/core/Backdrop";
import { useAlert } from 'react-alert'; 
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";



const  UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert(); // Use alert if you're using `react-alert`
  const { cartItems } = useSelector((state) => state.cart);
  const options = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}/>, name: `Cart(${cartItems.length})`, func: cart
  },  { icon: <ExitToAppIcon />, name: "Logout", func: handleLogout }

  ];

  if (user.role === 'admin') {
    options.unshift(
      { icon: <DashboardIcon />, name: "Dashboard", func: dashboard }
    );
  }

  function orders() {
    navigate("/orders");
  }
  function home() {
    navigate("/");
  }
  function cart() {
    navigate("/cart");
}


  function account() {
    navigate("/account");
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function handleLogout() {
    dispatch(logout());
    alert.success("Logout Successfully");
    navigate('/');
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
            src={user?.avatar?.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options && options.map((option) => (
          <SpeedDialAction
            key={option.name} // Added a key prop
            icon={option.icon}
            tooltipTitle={option.name}
            tooltipOpen={window.innerWidth < 600 ? true : false}
            onClick={option.func} // Added onClick handler
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
