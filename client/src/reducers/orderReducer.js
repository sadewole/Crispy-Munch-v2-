import {
    POST_ORDER,
    ORDER_LOADING,
    ORDER_LOADED,
    DELETE_ORDER,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_QUANTITY,
    FETCH_USER_HISTORY,
    UPDATE_USER_ORDER_PAYMENT,
    USER_HISTORY_LOADING,
    TOTAL,
    GET_SINGLE_ORDER
} from '../actions/types'

const initState = {
    orders: [],
    isLoading: true,
    msg: '',
    userOrders: [],
    userPendingOrders: [],
    singleOrder: null,
    total: null
}

export default (state = initState, action) => {
    const {
        payload,
        type
    } = action
    switch (type) {
        case ORDER_LOADING:
        case USER_HISTORY_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ORDER_LOADED:
            return {
                ...state,
                orders: payload.data,
                    isLoading: false,
                    msg: payload.msg
            };
        case GET_SINGLE_ORDER:
            return {
                ...state,
                singleOrder: payload.data,
                    isLoading: false,
                    msg: payload.msg
            };
        case POST_ORDER:
            return {
                ...state,
                orders: [...state.orders, payload.data],
                    isLoading: false,
                    msg: payload.msg
            };
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(i => i.id !== payload.id),
                    msg: payload.msg
            };
        case UPDATE_ORDER_STATUS:
        case UPDATE_ORDER_QUANTITY:
        case UPDATE_USER_ORDER_PAYMENT:
            return {
                ...state,
                msg: payload.msg
            };
        case FETCH_USER_HISTORY:
            return {
                ...state,
                userOrders: payload.data,
                    userPendingOrders: payload.data.filter(item => item.payment !== 'paid'),
                    isLoading: false
            };
        case TOTAL:
            return {
                ...state,
                total: payload.total,
                    msg: payload.msg,
                    isLoading: false
            };
        default:
            return state
    }
}