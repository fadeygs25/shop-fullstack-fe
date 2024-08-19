import React from "react";
import axios from 'axios';
import * as ActionTypes from '../ContextActions';
import { getCookie } from 'react-use-cookie';
import RatingReducer from '../action/RatingReducer';
import {
    RATINGS_FETCH_URL,
    RATING_CREATE_URL,
    RATING_DELETE_URL,
    RATING_BY_ID_URL,
    RATING_BY_PRODUCT_URL,
    RATING_COUNT_URL
} from '@/api/urls';

const RatingContext = React.createContext();

export const useRatings = () => {
    const context = React.useContext(RatingContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
};

export const RatingProvider = ({ children }) => {

    const initialstate = {
        ratings: null,
        countRatings: null,
        currentRating: null,
        ratingsByProduct: [],
        toasts: null,
        ratingCreated: false
    }

    const [state, dispatch] = React.useReducer(RatingReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie("token"),
        }
    }

    const getRatings = async () => {
        try {
            const res = await axios.get(RATINGS_FETCH_URL);
            dispatch({
                type: ActionTypes.GET_RATINGS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.RATING_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getCountRatings = async () => {
        try {
            const res = await axios.get(RATING_COUNT_URL);
            dispatch({
                type: ActionTypes.GET_RATINGS_COUNT,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.RATING_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getRatingById = async (ratingId) => {
        try {
            dispatch({
                type: ActionTypes.GET_RATING_BY_ID,
                payload: ratingId,
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.RATING_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getRatingByProduct = async (productId) => {
        try {
            const res = await axios.get(RATING_BY_PRODUCT_URL + productId);
            dispatch({
                type: ActionTypes.GET_RATING_BY_PRODUCT,
                payload: res.data,
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.RATING_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createRating = async (ratingData) => {
        try {
            const res = await axios.post(RATING_CREATE_URL, ratingData, config);
            dispatch({
                type: ActionTypes.NEW_RATING_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.RATING_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteRating = async (ratingId) => {
        try {
            const res = await axios.delete(RATING_DELETE_URL + ratingId, config);
            dispatch({
                type: ActionTypes.RATING_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.RATING_FAIL,
                payload: err.response.data,
            })
        }
    }
    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearRatings = async () => {
        dispatch({
            type: ActionTypes.CLEAR_RATINGS
        })
    }


    const clearRatingsByProduct = async () => {
        dispatch({
            type: ActionTypes.CLEAR_BLOGS
        })
    }



    return (
        <RatingContext.Provider value={{
            ratings: state.ratings,
            countRatings: state.countRatings,
            currentRating: state.currentRating,
            ratingsByProduct: state.ratingsByProduct,
            toasts: state.toasts,
            ratingCreated: state.ratingCreated,
            getRatings,
            getCountRatings,
            getRatingById,
            getRatingByProduct,
            createRating,
            deleteRating,
            clearErrors,
            clearRatings
        }}>
            {children}
        </RatingContext.Provider>

    )
}
