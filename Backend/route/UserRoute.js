const express = require("express");
const {create_users, all_users, user_login, user_logout, forgot_password, reset_password, user_details ,
     update_password ,update_profile , single_user , single_user_update ,update_user_profile,delete_user} = require("../controller/UserController");
const { isAuthanticatedUsers , isAuthorizeRole} = require("../middleware/Auth");

const router = express.Router();

router.route("/user/register").post(create_users);
router.route("/user/login").post(user_login);
router.route("/user/logout").post(user_logout);
router.route("/password/forgot").post(forgot_password);
router.route("/password/reset/:token").put(reset_password);
router.route('/user/update/password').put(isAuthanticatedUsers,update_password);
router.route('/user/update/profile').put(isAuthanticatedUsers,update_profile);
router.route("/me").get(isAuthanticatedUsers, user_details);


router.route("/admin/user/all").get(isAuthanticatedUsers,isAuthorizeRole("admin"),all_users);
router.route("/admin/user/details").get(isAuthanticatedUsers,isAuthorizeRole("admin"),user_details);
router.route('/admin/user/single/:id').get(isAuthanticatedUsers,isAuthorizeRole("admin"),single_user);
router.route('/admin/single/user/update/:id').put(isAuthanticatedUsers,isAuthorizeRole("admin"),update_user_profile);
router.route('/admin/single/user/delete/:id').delete(isAuthanticatedUsers,isAuthorizeRole("admin"),delete_user);

module.exports = router