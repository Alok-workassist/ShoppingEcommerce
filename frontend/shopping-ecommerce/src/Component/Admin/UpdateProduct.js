import React, { Fragment, useEffect, useState } from 'react';
import './NewProduct.css';
import Metadata from '../../Metadata';
import Sidebar from './Sidebar';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@material-ui/core";
import { useAlert } from 'react-alert';
import { clearError, updateProduct, getProductDetails } from '../../Action/ProductAction';
import { CLEAR_ERROR, NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../Constant/Constant';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { error, productDetails } = useSelector((state) => state.productDetails);
    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());  // Use the correct action to clear errors
        }
    
        if (!productDetails || productDetails._id !== params.id) {
            dispatch(getProductDetails(params.id));
        } else {
            setName(productDetails.name || "");
            setDescription(productDetails.description || "");
            setPrice(productDetails.price ? productDetails.price.toString() : "");
            setCategory(productDetails.category || "");
            setStock(productDetails.stocks || 0);
            setOldImages(productDetails.images || []);
        }
    
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());  // Correctly clear the update error
        }
    
        if (isUpdated) {
            alert.success("Product Updated Successfully");
            navigate("/admin/products");  // Navigate to /admin/products after successful update
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, error, updateError, isUpdated, productDetails, params.id, alert, navigate]);
    

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('category', category);
        myForm.set('description', description);
        myForm.set('stocks', stock);

        // Append each image individually to the FormData
        images.forEach((image) => {
            myForm.append('images', image);
        });

        dispatch(updateProduct(params.id, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

    return (
        <Fragment>
            <Metadata title="Update Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;
