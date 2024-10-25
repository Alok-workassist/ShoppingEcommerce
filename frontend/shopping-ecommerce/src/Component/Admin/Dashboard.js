import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import MetaData from "../../Metadata";
import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS, // Import Chart as alias to avoid conflicts
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    LineController,
    ArcElement, // Import ArcElement for Doughnut chart
    DoughnutController, // Import DoughnutController
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getAdminAllProducts } from "../../Action/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Action/OrderAction";
import { getAllUsers } from "../../Action/UserAction";

// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    LineController,
    ArcElement, // Register ArcElement
    DoughnutController, // Register DoughnutController
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    let totalAmount= 0;
    orders && orders.forEach((item)=>{
        totalAmount+=item.totalPrice;
    })

    let outOfStock = 0;
    products && products.forEach(element => {
        if (element.stocks == 0) {
            outOfStock += 1;
        }
    });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                data: [0, totalAmount],
                fill: true,
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock], // Updated to numerical values for the data
            },
        ],
    };

    useEffect(() => {
        dispatch(getAdminAllProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

   
    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹ {totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users&& users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
