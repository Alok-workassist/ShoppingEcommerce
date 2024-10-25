import React, { Fragment, useEffect, useState } from 'react'
import './Product.css';
import ProductCard from '../Home/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, getAllProducts } from '../../Action/ProductAction';
import Loader from '../Layout/Loader/Loader';
import Metadata from '../../Metadata';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';



const Products = () => {

  const categories = [
    'Laptop',
    'Mobile',
    'Camera',
    'Accessory',
    'SmartPhones',
    'Tops',
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  const { loading, error, products, resultPerPage, productsCount, filteredProductCount } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);

  }


  // console.log(filteredProductCount);
  // console.log(resultPerPage);
  // console.log(productsCount);

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearError())
    }

    dispatch(getAllProducts(keyword, currentPage, price, category,ratings));
  }, [dispatch, error, alert, currentPage, keyword, price, category,ratings]);

  // console.log(products);
  // const product = {
  //   name: "Product",
  //   price: 1200,
  //   numOfReviews: 3

  // }
  return (
    <Fragment>
      <Metadata title="All Products -- ECOMMERCE" />
      {loading ? <Loader /> : (
        <Fragment>

          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />

              ))
            ) : (
              <p>No Product Available</p>
            )}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>


          {filteredProductCount > resultPerPage && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>)}


        </Fragment>
      )}
    </Fragment>

  )
}

export default Products
