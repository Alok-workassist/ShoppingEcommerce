const express = require('express');
const { new_order, single_order, my_order, all_order, update_order, delete_order } = require('../controller/OrderController');
const { isAuthanticatedUsers ,isAuthorizeRole} = require('../middleware/Auth');


const router = express.Router();


router.route('/order/create-new').post(isAuthanticatedUsers,new_order);
router.route('/order/:id').get(isAuthanticatedUsers,single_order);
router.route('/user/order/all').get(isAuthanticatedUsers,my_order);

// Admin

router.route('/admin/order/all').get(isAuthanticatedUsers,isAuthorizeRole('admin'),all_order);
router.route('/admin/order/update/:id').put(isAuthanticatedUsers,isAuthorizeRole('admin'),update_order);
router.route('/admin/order/delete/:id').delete(isAuthanticatedUsers,isAuthorizeRole('admin'),delete_order);


module.exports = router