import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import { FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import logo from '../../../assests/logo.png';


const Header = () => {

  const Options = {
    burgerColor: "#eb4034",
    burgerColorHover: "#a62d24",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Color: "rgba(35,35,35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link2ColorHover: "#eb4034",
    link3ColorHover: "#eb4034",
    link4ColorHover: "#eb4034",
    link1Margin: "1vmax",
    link2Margin: "1vmax",
    link1Size: "1.5vmax",
    link2Size: "1.5vmax",
    link3Margin: "0",
    link4Margin: "2vmax",
    profileIcon: true,
    ProfileIconElement: FaUser,
    profileIconColor: "black",
    profileIconColorHover: "red",
    searchIcon: true,
    SearchIconElement: FaSearch,
    searchIconColor: "black",
    searchIconColorHover: "red",
    cartIcon: true,
    CartIconElement: FaShoppingCart,
    cartIconColor: "black",
    cartIconColorHover: "red",
    profileIconSize: "1.5vmax",
    searchIconSize: "1.5vmax",
    CartIconSize: "1.5vmax",
    cartIconMargin: "1vmax"
  }
  return (
       <ReactNavbar  {...Options}/>
  )
}

export default Header
