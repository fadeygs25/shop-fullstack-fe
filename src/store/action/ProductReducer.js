import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_PRODUCT_SUCCESS:
            let products = state.products ? state.products : [];

            return {
                ...state,
                productCreated: true,
                products: [...products, action.payload]
            }
        case ActionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        case ActionTypes.GET_PRODUCTS_COUNT:
            return {
                ...state,
                countProducts: action.payload
            }

        case ActionTypes.PRODUCT_FAIL:
            return {
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product._id === action.payload._id ? action.payload : product)
            }
        case ActionTypes.PRODUCT_DELETE:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload.productId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_PRODUCT_BY_ID:
            return {
                ...state,
                productsById: action.payload
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: null,
                productCreated: false
            }
        case ActionTypes.CLEAR_PRODUCTS:
            return {
                ...state,
                products: null,
                currentProduct: null,
                productCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}