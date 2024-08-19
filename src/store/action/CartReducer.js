import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_CART_SUCCESS:
            let carts = state.carts ? state.carts : [];

            return {
                ...state,
                CARTCreated: true,
                currentCART: action.payload,
                carts: [...carts, action.payload]
            }
        case ActionTypes.GET_CARTS_SUCCESS:
            return {
                ...state,
                carts: action.payload
            }
        case ActionTypes.GET_CARTS_BY_USER_SUCCESS:
            return {
                ...state,
                cartsByUser: action.payload
            }

        case ActionTypes.CART_FAIL:
            return {
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_CART:
            return {
                ...state,
                cartsByUser: action.payload,
                cartsByUser: state.cartsByUser.map(cart => cart._id === action.payload._id ? action.payload : cart)
            }

        case ActionTypes.CART_DELETE:
            return {
                ...state,
                cartsByUser: state.cartsByUser.filter(cart => cart._id !== action.payload.cartId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_CART_BY_ID:
            return {
                ...state,
                currentCART: state.carts ? state.carts.find(CART => CART._id === action.payload) : null

            }

        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_CART:
            return {
                ...state,
                currentCART: null,
                CARTCreated: false
            }
        case ActionTypes.CLEAR_CARTS:
            return {
                ...state,
                carts: null,
                currentCART: null,
                CARTCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}