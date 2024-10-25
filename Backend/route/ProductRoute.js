const express = require('express');
const { getAllProducts, createProduct, updateProduct, singleProduct, deletProduct ,product_review, getProduct_reviews,deleteProduct_reviews, getAdminAllProducts} = require('../controller/ProductController');
const { isAuthanticatedUsers ,isAuthorizeRole} = require('../middleware/Auth');

const router = express.Router();

router.route('/product/all').get(getAllProducts);
router.route('/product/create').post(isAuthanticatedUsers,isAuthorizeRole("admin"),createProduct);
router.route('/product/update/:id').put(isAuthanticatedUsers,isAuthorizeRole("admin"),updateProduct);
router.route('/product/single/:id').get(singleProduct);

router.route('/admin/product/all').get(isAuthanticatedUsers,isAuthorizeRole("admin"),getAdminAllProducts);
router.route('/product/delete/:id').delete(isAuthanticatedUsers,isAuthorizeRole("admin"),deletProduct);
router.route('/product/reviews/create').put(isAuthanticatedUsers,product_review);
router.route('/product/reviews').get(getProduct_reviews);
router.route('/product/reviews/delete').delete(isAuthanticatedUsers,deleteProduct_reviews);


module.exports = router