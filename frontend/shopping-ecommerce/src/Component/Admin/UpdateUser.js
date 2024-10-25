import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clearError, getUserDetails, updateUser } from '../../Action/UserAction'; 
import { useDispatch, useSelector } from 'react-redux';
import Metadata from '../../Metadata';
import Sidebar from './Sidebar';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Button } from "@material-ui/core";
import Loader from '../Layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { UPDATE_USER_RESET } from '../../Constant/UserConstant';

const UpdateUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    console.log("userId: ", userId); // Debugging log for userId
    console.log("Fetched user: ", user); // Debugging log for user details
    
    if (user && user._id !== userId) {
      console.log("Dispatching getUserDetails...");
      dispatch(getUserDetails(userId));
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId, navigate]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('role', role);

    dispatch(updateUser(userId, myForm)); // Ensure the action is correctly dispatched
  };

  return (
    <Fragment>
      <Metadata title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader /> // Show loader while fetching user details
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={updateLoading || role === ""}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
