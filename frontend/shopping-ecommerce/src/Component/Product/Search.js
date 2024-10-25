import React, { Fragment, useState } from 'react';
import './Search.css';
import Metadata from '../../Metadata';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <Fragment>
            <Metadata title="Search A Product -- ECOMMERCE" />
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input
                    type='text'
                    placeholder='Search a Product..'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type='submit' value='Search' />
            </form>
        </Fragment>
    );
};

export default Search;
