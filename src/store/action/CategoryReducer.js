import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_CATEGORY_SUCCESS:
            let categories = state.categories ? state.categories : [];

            return {
                ...state,
                categoryCreated: true,
                categoriesById: action.payload,
                categories: [...categories, action.payload]
            }
        case ActionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload
            }

        case ActionTypes.CATEGORY_FAIL:
            return {
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map(category => category._id === action.payload._id ? action.payload : category)
            }

        case ActionTypes.CATEGORY_DELETE:
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== action.payload.categoryId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_CATEGORY_BY_ID:
            return {
                ...state,
                categoriesById: action.payload,

            }

        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_CATEGORY:
            return {
                ...state,
                categoriesById: null,
                categoryCreated: false
            }
        case ActionTypes.CLEAR_CATEGORIES:
            return {
                ...state,
                categories: null,
                categoriesById: null,
                categoryCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}