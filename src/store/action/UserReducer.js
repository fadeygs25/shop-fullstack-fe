/* eslint-disable import/no-anonymous-default-export */
import * as ActionTypes from '../ContextActions';
import Cookies from 'js-cookie'


export default (state, action) => {
    const options = {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000)
    };

    switch (action.type) {
        case ActionTypes.REGISTER_FAIL:
        case ActionTypes.LOGIN_FAIL:
            Cookies.remove('token')
            return {
                ...state,
                toasts: action.payload,
                currentUser: "",
                token: null,
                isAuthenticated: false,
            }
        case ActionTypes.AUTH_ERROR:
            return {
                ...state,
                toasts: action.payload,
            }
        case ActionTypes.LOGOUT:
            Cookies.remove('token')
            window.location.reload()
            return {
                ...state,
                token: null,
                currentUser: null,
                isAuthenticated: false,
                toasts: null
            }

        case ActionTypes.REGISTER_SUCCESS:
            Cookies.set('token', action.payload);
            window.location.reload();
            return {
                ...state,
                token: null,
            }
        case ActionTypes.LOGIN_SUCCESS:
            Cookies.set('token', action.payload, { expires: new Date(Date.now() + 1 * 60 * 60 * 1000) });
            window.location.reload();
            return {
                ...state,
                isAuthenticated: true
            }
        case ActionTypes.LOGIN_TEST:

            return {
                ...state,
                isAuthenticated: true
            }
        case ActionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        case ActionTypes.GET_USER_BY_ID:
            return {
                ...state,
                usersById: action.payload
            }
        case ActionTypes.GET_USERS_COUNT:
            return {
                ...state,
                countUsers: action.payload
            }
        case ActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                currentUser: action.payload,
            }
        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
            }
        case ActionTypes.USER_FAIL:
            return {
                ...state,
                toasts: action.payload
            }
        case ActionTypes.USER_DELETE:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload.userId),
                toasts: action.payload.toasts
            }

        case ActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        default:
            return state;
    }
}