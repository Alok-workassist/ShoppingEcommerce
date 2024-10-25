import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Fix the import from `thunk` to `thunk` as it is a named import
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage for web)
import { actionProductReducer, newProductReducer, newReviewReducer, ProductDetailReducer, ProductReducer, productReviewsReducer, reviewReducer } from './Reducer/ProductReducer';
import { allUserReducer, allUsersReducer, ForgotPasswordReducer, UpdateProfileReducer, userDetailsReducer, UserReducer } from './Reducer/UserReducer';
import { CartReducer } from './Reducer/CartReducer';
import { allOrderReducer, MyOrderReducer, OrderDetailsReducer, orderReducer, OrderReducer } from './Reducer/OrderReducer';
import { newReview } from './Action/ProductAction';

const rootReducer = combineReducers({
  products: ProductReducer,
  productDetails: ProductDetailReducer,
  user: UserReducer,
  profile: UpdateProfileReducer,
  forgotPassword: ForgotPasswordReducer,
  cart: CartReducer,
  newOrder: OrderReducer,
  myOrders: MyOrderReducer,
  orderDetails: OrderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: actionProductReducer,
  allOrders: allOrderReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // List of reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export default store; // Export `store` as the default export
export { persistor };
