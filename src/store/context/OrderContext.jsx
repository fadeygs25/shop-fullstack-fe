import React from "react";
import axios from 'axios';
import * as ActionTypes from '../ContextActions';
import {
    ORDERS_FETCH_URL,
    ORDER_CREATE_URL,
    ORDER_BY_ID_URL,
    ORDER_COUNT_URL,
    ORDER_DELETE_URL
} from '@/api/urls';
import { getCookie } from 'react-use-cookie';
import OrderReducer from '../action/OrderReducer';

const OrderContext = React.createContext();

export const useOrders = () => {
    const context = React.useContext(OrderContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
};

export const OrderProvider = ({ children }) => {

    const initialstate = {
        orders: null,
        currentOrder: null,
        countOrders: null,
        toasts: null,
        isAuthenticated: null,
    }
    const [state, dispatch] = React.useReducer(OrderReducer, initialstate);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie("token"),
        }
    }

    const getOrders = async () => {
        try {
            const res = await axios.get(ORDERS_FETCH_URL, config);
            dispatch({
                type: ActionTypes.GET_ORDERS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.USER_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getCountOrders = async () => {
        try {
            const res = await axios.get(ORDER_COUNT_URL, config);
            dispatch({
                type: ActionTypes.GET_ORDERS_COUNT,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.ORDER_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getOrderById = async (orderId) => {
        try {
            const res = await axios.get(ORDER_BY_ID_URL + orderId);
            dispatch({
                type: ActionTypes.GET_ORDER_BY_ID,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.ORDER_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createOrder = async (orderData) => {
        try {
            const res = await axios.post(ORDER_CREATE_URL, orderData, config);
            dispatch({
                type: ActionTypes.NEW_ORDER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.ORDER_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteOrder = async (orderId) => {
        try {
            const res = await axios.delete(ORDER_DELETE_URL + orderId, config);
            dispatch({
                type: ActionTypes.ORDER_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.ORDER_FAIL,
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
        <OrderContext.Provider value={{
            orders: state.orders,
            currentOrder: state.currentOrder,
            countOrders: state.countOrders,
            toasts: state.toasts,
            isAuthenticated: state.isAuthenticated,
            getOrders,
            createOrder,
            getCountOrders,
            getOrderById,
            deleteOrder,
            clearErrors
        }}>
            {children}
        </OrderContext.Provider>

    )
}
