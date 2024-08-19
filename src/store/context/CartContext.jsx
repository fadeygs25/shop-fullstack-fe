import React from "react";
import axios from 'axios';
import * as ActionTypes from '../ContextActions';
import { getCookie } from 'react-use-cookie';
import CARTReducer from '../action/CartReducer';
import {
    CARTS_FETCH_URL,
    CART_CREATE_URL,
    CART_DELETE_URL,
    CART_BY_ID_URL,
    CART_BY_USER_URL,
    CART_UPDATE_URL
} from '@/api/urls';

const CartContext = React.createContext();

export const useCarts = () => {
    const context = React.useContext(CartContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
};

export const CartProvider = ({ children }) => {

    const initialstate = {
        carts: null,
        currentCart: null,
        cartsByUser: [],
        toasts: null,
        cartCreated: false
    }

    const [state, dispatch] = React.useReducer(CARTReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie("token"),
        }
    }

    const getCarts = async () => {
        try {
            const res = await axios.get(CARTS_FETCH_URL);
            dispatch({
                type: ActionTypes.GET_CARTS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CART_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getCartById = async (cartId) => {
        try {

            dispatch({
                type: ActionTypes.GET_CART_BY_ID,
                payload: cartId,
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CART_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getCartByUser = async (userId) => {
        try {
            const res = await axios.get(CART_BY_USER_URL, config);
            dispatch({
                type: ActionTypes.GET_CARTS_BY_USER_SUCCESS,
                payload: res.data,
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CART_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createCart = async (cartData) => {
        try {
            const res = await axios.post(CART_CREATE_URL, cartData, config);
            dispatch({
                type: ActionTypes.NEW_CART_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CART_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateCart = async (cartData) => {
        try {
            const res = await axios.post(CART_UPDATE_URL + cartData.cartId, cartData, config);
            dispatch({
                type: ActionTypes.UPDATE_CART,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CART_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteCart = async (cartId) => {
        try {
            const res = await axios.delete(CART_DELETE_URL + cartId, config);
            dispatch({
                type: ActionTypes.CART_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CART_FAIL,
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
        <CartContext.Provider value={{
            carts: state.carts,
            currentCart: state.currentCart,
            cartsByUser: state.cartsByUser,
            toasts: state.toasts,
            cartCreated: state.cartCreated,
            getCarts,
            getCartById,
            getCartByUser,
            createCart,
            deleteCart,
            clearErrors,
            updateCart
        }}>
            {children}
        </CartContext.Provider>

    )
}
