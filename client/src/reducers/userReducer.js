import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    ALL_USER_LOADED,
    ALL_USER_LOADING,
    USER_UPGRADED
} from '../actions/types'

const initState = {
    isLoading: true,
    user: null,
    allUser: null,
    msg: ''
}

export default (state = initState, action) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case USER_LOADING:
        case ALL_USER_LOADING:
            return {
                ...state, isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                    user: payload.data,
                    msg: payload.msg
            };
        case ALL_USER_LOADED:
            return {
                ...state,
                isLoading: false,
                    allUser: payload.data,
                    msg: payload.msg
            };
        case USER_UPGRADED:
            return {
                ...state,
                msg: payload.msg
            };
        default:
            return state
    }
}