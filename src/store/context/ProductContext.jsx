import React from "react";
import axios from 'axios';
import * as ActionTypes from '../ContextActions';
import { getCookie } from 'react-use-cookie';
import ProductReducer from '../action/ProductReducer';
import {
    PRODUCTS_FETCH_URL,
    PRODUCT_CREATE_URL,
    PRODUCT_DELETE_URL,
    PRODUCT_BY_ID_URL,
    PRODUCT_COUNT_URL,
    PRODUCT_UPDATE_URL
} from '@/api/urls';

const ProductContext = React.createContext();

export const useProducts = () => {
    const context = React.useContext(ProductContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
};

export const ProductProvider = ({ children }) => {

    const initialstate = {
        products: null,
        productsById: null,
        countProducts: null,
        currentProduct: null,
        toasts: null,
        blogCreated: false
    }

    const [state, dispatch] = React.useReducer(ProductReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie("token"),
        }
    }

    const getProducts = async () => {
        try {
            const res = await axios.get(PRODUCTS_FETCH_URL);
            dispatch({
                type: ActionTypes.GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PRODUCT_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getCountProducts = async () => {
        try {
            const res = await axios.get(PRODUCT_COUNT_URL, config);
            dispatch({
                type: ActionTypes.GET_PRODUCTS_COUNT,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PRODUCT_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getProductById = async (productId) => {
        try {
            const res = await axios.get(PRODUCT_BY_ID_URL + productId);
            dispatch({
                type: ActionTypes.GET_PRODUCT_BY_ID,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PRODUCT_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createProduct = async (productData) => {
        try {
            const res = await axios.post(PRODUCT_CREATE_URL, productData, config);
            dispatch({
                type: ActionTypes.NEW_PRODUCT_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PRODUCT_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateProduct = async (productData) => {
        try {
            const res = await axios.put(PRODUCT_UPDATE_URL + productData._id, productData, config);
            dispatch({
                type: ActionTypes.UPDATE_PRODUCT,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PRODUCT_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const res = await axios.delete(PRODUCT_DELETE_URL + productId, config);
            dispatch({
                type: ActionTypes.PRODUCT_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.PRODUCT_FAIL,
                payload: err.response.data,
            })
        }
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }


    return (
        <ProductContext.Provider value={{
            products: state.products,
            countProducts: state.countProducts,
            productsById: state.productsById,
            currentProduct: state.currentProduct,
            toasts: state.toasts,
            productCreated: state.productCreated,
            getProducts,
            getCountProducts,
            getProductById,
            createProduct,
            updateProduct,
            deleteProduct,
            clearErrors
        }}>
            {children}
        </ProductContext.Provider>

    )
}
