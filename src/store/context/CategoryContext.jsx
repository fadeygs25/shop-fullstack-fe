import React from "react";
import axios from 'axios';
import * as ActionTypes from '../ContextActions';
import { getCookie } from 'react-use-cookie';
import CategoryReducer from '../action/CategoryReducer';
import {
    CATEGORIES_FETCH_URL,
    CATEGORY_CREATE_URL,
    CATEGORY_DELETE_URL,
    CATEGORY_BY_ID_URL,
    CATEGORY_UPDATE_URL
} from '@/api/urls';

const CategoryContext = React.createContext();

export const useCategories = () => {
    const context = React.useContext(CategoryContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
};

export const CategoryProvider = ({ children }) => {

    const initialstate = {
        categories: [],
        currentCategory: null,
        categoriesById: null,
        toasts: null,
        categoryCreated: false
    }

    const [state, dispatch] = React.useReducer(CategoryReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie("token"),
        }
    }

    const getCategories = async () => {
        try {
            const res = await axios.get(CATEGORIES_FETCH_URL);
            dispatch({
                type: ActionTypes.GET_CATEGORIES_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CATEGORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getCategoryById = async (categoryId) => {
        try {
            const res = await axios.get(CATEGORY_BY_ID_URL + categoryId);
            dispatch({
                type: ActionTypes.GET_CATEGORY_BY_ID,
                payload: res.data,
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CATEGORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createCategory = async (categoryData) => {
        try {
            const res = await axios.post(CATEGORY_CREATE_URL, categoryData, config);
            dispatch({
                type: ActionTypes.NEW_CATEGORY_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CATEGORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateCategory = async (categoryData) => {
        try {
            const res = await axios.put(CATEGORY_UPDATE_URL + categoryData._id, categoryData, config);
            dispatch({
                type: ActionTypes.UPDATE_CATEGORY,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CATEGORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteCategory = async (categoryId) => {
        try {
            const res = await axios.delete(CATEGORY_DELETE_URL + categoryId, config);
            dispatch({
                type: ActionTypes.CATEGORY_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.CATEGORY_FAIL,
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
        <CategoryContext.Provider value={{
            categories: state.categories,
            currentCategory: state.currentCategory,
            categoriesById: state.categoriesById,
            toasts: state.toasts,
            categoryCreated: state.categoryCreated,
            getCategories,
            getCategoryById,
            createCategory,
            updateCategory,
            deleteCategory,
            clearErrors
        }}>
            {children}
        </CategoryContext.Provider>

    )
}
