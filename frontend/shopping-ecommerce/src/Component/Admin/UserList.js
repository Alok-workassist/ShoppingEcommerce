import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import Metadata from "../../Metadata";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../Action/UserAction";
import { DELETE_USER_RESET } from "../../Constant/UserConstant";

const UserList = () => {
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "name",
            headerName: "name",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "role",
            headerName: "Role",
            minWidth: 270,
            flex: 0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id, "role")=='admin'?'greenColor':'redColor'
            }
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                        onClick={() => {
                            const isConfirmed = window.confirm(
                                "Are you sure you want to delete this user?"
                            );
                            if (isConfirmed) {
                                deleteUserhandler(params.getValue(params.id, "id"));
                            }
                        }}
                    >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const dispatch = useDispatch();
    const alert = useAlert();

    const { users } = useSelector((state) => state.allUsers);  // Default to empty array
    const {
        
        error: deleteError,
        isDeleted,
    } = useSelector((state) => state.profile);

    const rows = [];

    if (Array.isArray(users)) {
        users.forEach(item => {
            rows.push({
                id: item._id,
                email: item.email,
                name: item.name,
                role: item.role,
            });
        });
    } else if (typeof users === "object" && users !== null) {
        rows.push({
            id: users._id,
            email: users.email,
            name: users.name,
            role: users.role,
        });
    }
   

    const params = useParams();
    const deleteUserhandler = ($id)=>{
        dispatch(deleteUser($id));
    }

    useEffect(() => {
        if(deleteError)
        {
           alert.error(deleteError);
        }
        if(isDeleted)
        {
            alert.success("User Deleted Successfully");
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch,isDeleted]);

    return (
        <Fragment>
            <Metadata title={`ALL Users - Admin`} />
            

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default UserList
