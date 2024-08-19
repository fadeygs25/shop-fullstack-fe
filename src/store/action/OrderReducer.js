import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_ORDER_SUCCESS:
            let orders = state.orders ? state.orders : [];

            return {
                ...state,
                orderCreated: true,
                currentOrder: action.payload,
                orders: [...orders, action.payload]
            }
        case ActionTypes.GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload
            }
        case ActionTypes.GET_ORDERS_COUNT:
            return {
                ...state,
                countOrders: action.payload
            }
        case ActionTypes.ORDER_FAIL:
            return {
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_ORDER:
            return {
                ...state,
                currentOrder: action.payload,
                orders: state.orders.map(order => order._id === action.payload._id ? action.payload : order)
            }
        case ActionTypes.ORDER_DELETE:
            return {
                ...state,
                orders: state.orders.filter(order => order.id_order !== action.payload.orderId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_ORDER_BY_ID:
            return {
                ...state,
                currentOrder: action.payload,
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: null,
                orderCreated: false
            }
        case ActionTypes.CLEAR_ORDERS:
            return {
                ...state,
                orders: null,
                currentOrder: null,
                orderCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}