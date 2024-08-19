import React from "react";
import axios from 'axios';
import ProfileReducer from '../action/UserReducer';
import * as ActionTypes from '../ContextActions';
import {
    USER_FETCH_URL,
    USER_LOGOUT_URL,
    USERS_FETCH_URL,
    USER_COUNT_URL,
    USER_BY_ID_URL,
    USER_REGISTER_URL,
    USER_DELETE_URL,
    USER_LOGIN_URL,
    USER_UPDATE_URL,
    USER_GOOGLE_URL,
    GOOGLE_AUTH_LINK
} from '@/api/urls';
import { getCookie } from 'react-use-cookie';

const UserContext = React.createContext();

export const useUsers = () => {
    const context = React.useContext(UserContext);
    if (!context) throw new Error("Post Provider is missing");
    return context;
};

export const UserProvider = ({ children }) => {

    const initialstate = {
        token: getCookie("token"),
        users: null,
        currentUser: null,
        countUsers: null,
        usersById: null,
        toasts: null,
        isAuthenticated: null,
    }
    const [state, dispatch] = React.useReducer(ProfileReducer, initialstate);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie("token"),
        }
    }

    const registerUser = async (userData) => {
        try {
            const res = await axios.post(USER_REGISTER_URL, userData, config);
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.REGISTER_FAIL,
                payload: err.response.data,
            })
        }
    }

    const loginUser = async (userData) => {
        try {
            const res = await axios.post(USER_LOGIN_URL, userData, config);
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: err.response.data,
            })
        }
    }

    const loginGoogleUser = async (userData) => {
        try {
            const res = await axios.post(USER_GOOGLE_URL, userData);
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateProfile = async (userData) => {
        try {
            const res = await axios.put(USER_UPDATE_URL + userData._id, userData, config);
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
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

    const updateUser = async (userData) => {
        try {
            const res = await axios.put(USER_UPDATE_URL + userData._id, userData, config);
            dispatch({
                type: ActionTypes.UPDATE_USER,
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

    const getUsers = async () => {
        try {
            const res = await axios.get(USERS_FETCH_URL, config);
            dispatch({
                type: ActionTypes.GET_USERS_SUCCESS,
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

    const getCountUsers = async () => {
        try {
            const res = await axios.get(USER_COUNT_URL, config);
            dispatch({
                type: ActionTypes.GET_USERS_COUNT,
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

    const getUserById = async (userId) => {
        try {
            const res = await axios.get(USER_BY_ID_URL + userId);
            dispatch({
                type: ActionTypes.GET_USER_BY_ID,
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


    const getProfile = async () => {
        try {
            const res = await axios.get(USER_FETCH_URL, config);
            dispatch({
                type: ActionTypes.SET_CURRENT_USER,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.AUTH_ERROR,
                payload: err.response.data,
            })
        }
    }

    const logoutUser = async () => {

        dispatch({
            type: ActionTypes.LOGOUT,
        })

    }

    const deleteUser = async (userId) => {
        try {
            const res = await axios.delete(USER_DELETE_URL + userId, config);
            dispatch({
                type: ActionTypes.USER_DELETE,
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

    const clearErrors = () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }



    return (
        <UserContext.Provider value={{
            token: state.token,
            users: state.users,
            currentUser: state.currentUser,
            countUsers: state.countUsers,
            usersById: state.usersById,
            toasts: state.toasts,
            isAuthenticated: state.isAuthenticated,
            getProfile,
            getUsers,
            getCountUsers,
            logoutUser,
            clearErrors,
            getUserById,
            registerUser,
            loginUser,
            loginGoogleUser,
            updateProfile,
            updateUser,
            deleteUser
        }}>
            {children}
        </UserContext.Provider>

    )
}
