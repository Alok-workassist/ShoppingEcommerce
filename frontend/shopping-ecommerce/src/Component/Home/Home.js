import React, { Fragment, useEffect } from 'react';
import './Home.css';
import ProductCard from './ProductCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Action/ProductAction.js';
import Loader from '../Layout/Loader/Loader.js';
import Metadata from '../../Metadata.js';
import { useAlert } from 'react-alert';

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
        }
        dispatch(getAllProducts());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            <Metadata title={"Ecommerce Shopping | Home Page"} />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className='banner'>
                        <video
                            className='bannerVideo'
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="coverV.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                       
                    </div>
                    <h2 className='homeHeading'>Featured Products</h2>
                    <div className='container' id='container'>
                        {products && products.length > 0 ?
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            )) :
                            (<p>No Products Available</p>)
                        }
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home;
