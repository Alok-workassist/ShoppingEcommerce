import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Layout/Header/Header.js';
import Footer from './Component/Layout/Footer/Footer.js';
import Home from './Component/Home/Home.js';
import UpdateProfiles from './Component/User/UpdateProfile.js';
import webfont from 'webfontloader';
import React, { useEffect, useState } from 'react';
import ProductDetail from './Component/Product/ProductDetail.js';
import Products from './Component/Product/Products.js';
import Search from './Component/Product/Search.js';
import LoginSignup from './Component/User/LoginSignup.js';
import store from './Store.js';
import { loadUser } from './Action/UserAction.js';
import { useSelector } from 'react-redux';
import UserOptions from './Component/Layout/Header/Useroptions.js';
import LoginOptions from './Component/Layout/Header/LoginOptions.js';
import Profile from './Component/User/Profile.js';
import { getAllProducts } from './Action/ProductAction.js';
import ProtectedRoute from './Component/Route/ProtectedRoute.js';
import UpdatePassword from './Component/User/UpdatePassword.js';
import ForgotPassword from './Component/User/ForgotPassword.js';
import ResetPassword from './Component/User/ResetPassword.js';
import NotFound from './Component/Layout/NotFound.js';
import Cart from './Component/Cart/Cart.js';
import ShippingInfo from './Component/Cart/ShippingInfo.js';
import OrderConfirm from './Component/Cart/OrderConfirm.js';
import Payment from './Component/Cart/Payment.js';
import OrderSuccess from './Component/Cart/OrderSuccess.js';
import MyOrder from './Component/Order/MyOrder.js';
import OrderDetails from './Component/Order/OrderDetails.js';
import Dashboard from './Component/Admin/Dashboard.js';
import ProductList from './Component/Admin/ProductList.js';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAlert } from 'react-alert';
import NewProduct from './Component/Admin/NewProduct.js';
import UpdateProduct from './Component/Admin/UpdateProduct.js';
import OrderList from './Component/Admin/OrderList.js';
import ProcessOrder from './Component/Admin/ProcessOrder.js';
import UserList from './Component/Admin/UserList.js';
import UpdateUser from './Component/Admin/UpdateUser.js';
import ProductReviews from './Component/Admin/ProductReviews.js';

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApikey, setStripeApiKey] = useState("");
  const alert = useAlert();

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    // console.log(data.stripeApiKey);
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    store.dispatch(loadUser());
    store.dispatch(getAllProducts());
    getStripeApiKey();


  }, []);
  window.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
  })

  return (
    <Router>
      <Header />
      {isAuthenticated && user ? <UserOptions user={user} /> : <LoginOptions />}

      {/* Define Main Routes */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfiles />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ProtectedRoute element={<ShippingInfo />} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={<OrderConfirm />} />} />
        <Route path="/success" element={<ProtectedRoute element={<OrderSuccess />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<MyOrder />} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignup />} />

        //Admin Route
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} element={<Dashboard />} />} />
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} element={<ProductList />} />} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} element={<NewProduct />} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateProduct />} />} />
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} element={<OrderList />} />} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} element={<ProcessOrder />} />} />
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} element={<UserList />} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateUser />} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} element={<UpdateUser />} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true} element={<ProductReviews />} />} />

        {/* Catch-All Route for Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Stripe Payment Route wrapped in Elements */}
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route path="/process/payment" element={<ProtectedRoute element={< Payment />} />} />
          </Routes>
        </Elements>
      )}


      <Footer />
    </Router>
  );
}

export default App;
