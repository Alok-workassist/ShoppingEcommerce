import React, { Fragment, useEffect } from 'react';
import './Home.css'
import ProductCard from './ProductCard.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Action/ProductAction.js';
import Loader from '../Layout/Loader/Loader.js';
import Metadata from '../../Metadata.js';
import  {useAlert}  from 'react-alert';
const Home = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
        }
        dispatch(getAllProducts());
    }, [dispatch, error,alert]);

    // const product = {
    //     name: "Product",
    //     price: 1200,
    //     numOfReviews: 3

    // }
    return (
        <Fragment>
            <Metadata title={"Ecommerce Shopping|Home Page"} />
            {loading?<Loader/>:(
                <Fragment>
                     <div className='banner'>
                <p>Welcome to Ecommerce</p>
                <h1>Find Amazing Products Below</h1>
                <a href='#container'>
                    <button>Scroll</button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
            <div className='container' id='container'>
                {products && products.length > 0 ?

                    (products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    )))
                    : (<p>No Products Available</p>)
                }
            </div>

                </Fragment>
            )}
           
        </Fragment>
    )
}

export default Home
