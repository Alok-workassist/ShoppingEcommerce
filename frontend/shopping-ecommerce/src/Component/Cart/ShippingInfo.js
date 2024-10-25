import React, { Fragment, useState } from 'react';
import Metadata from '../../Metadata';
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import './Shipping.css';
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../Action/CartAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps.js'


const ShippingInfo = () => {

    const  shippingInfo  = useSelector((state) => state.cart.shippingInfo);


    const [address, setAddress] = useState(shippingInfo?.address || '');
    const [city, setCity] = useState(shippingInfo?.city || '');
    const [pinCode, setPincode] = useState(shippingInfo?.pinCode || '');
    const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || '');
    const [country, setCountry] = useState(shippingInfo?.country || '');
    const [state, setState] = useState(shippingInfo?.state || '');

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const shippingSubmit = (e) => {
        e.preventDefault(); // Prevent form default behavior
        const shippingData = {
            address,
            phoneNo,
            state,
            city,
            pinCode,
            country
        };
       
        dispatch(saveShippingInfo(shippingData)); // Pass the shippingData object
       
        navigate("/order/confirm");
    };
    return (
        <Fragment>
            <Metadata title="Shipping Details" />
            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form
                        className="shippingForm" onSubmit={shippingSubmit} >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                size="10"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>

                        <div>
                            <PublicIcon />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}

                            </select>
                        </div>

                        {country && (<div>
                            <TransferWithinAStationIcon />
                            <select
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}>

                                <option value="">State</option>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>)
                        }
                        {state && (
                            <div>
                                <LocationCityIcon />
                                <select
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option value="">City</option>
                                    {City &&
                                        City.getCitiesOfState(country, state).map((item) => (
                                            <option key={item.isoCode} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                        />
                    </form>

                </div>
            </div >

        </Fragment >
    )
}

export default ShippingInfo
