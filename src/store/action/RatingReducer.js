import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_RATING_SUCCESS:
            let ratingsByProduct = state.ratingsByProduct ? state.ratingsByProduct : [];

            return {
                ...state,
                ratingCreated: true,
                currentRating: action.payload,
                ratingsByProduct: [...ratingsByProduct, action.payload]
            }

        case ActionTypes.GET_RATINGS_SUCCESS:
            return {
                ...state,
                ratings: action.payload
            }

        case ActionTypes.GET_RATINGS_COUNT:
            return {
                ...state,
                countRatings: action.payload
            }

        case ActionTypes.GET_RATING_BY_PRODUCT:
            return {
                ...state,
                ratingsByProduct: action.payload
            }

        case ActionTypes.RATING_FAIL:
            return {
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_RATING:
            return {
                ...state,
                currentRating: action.payload,
                ratings: state.ratings.map(rating => rating._id === action.payload._id ? action.payload : rating)
            }

        case ActionTypes.RATING_DELETE:
            return {
                ...state,
                ratings: state.ratings.filter(rating => rating._id !== action.payload.ratingId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_RATING_BY_ID:
            return {
                ...state,
                currentRating: state.ratings ? state.ratings.find(rating => rating._id === action.payload) : null

            }



        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_RATING:
            return {
                ...state,
                currentRating: null,
                ratingCreated: false
            }
        case ActionTypes.CLEAR_RATINGS:
            return {
                ...state,
                ratings: null,
                currentRating: null,
                ratingsByProduct: null,
                ratingCreated: false,
                toasts: null
            }
        case ActionTypes.CLEAR_RATINGS_BY_PRODUCT:
            return {
                ...state,
                ratings: null,
                currentRating: null,
                ratingsByProduct: null,
                ratingCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}