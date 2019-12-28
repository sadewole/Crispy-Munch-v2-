import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOG_OUT,
    USER_LOADED,
    USER_LOADING
} from '../actions/types'

const initState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    user: null,
    msg: '',
    isAuthenticated: false
}

export default (state = initState, action) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                user: payload.data,
                    isAuthenticated: true,
                    isLoading: false
            };
        case AUTH_REGISTER:
        case AUTH_LOGIN:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                isLoading: false,
                    user: payload.data,
                    msg: payload.msg,
                    isAuthenticated: true
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                msg: payload.msg,
                    isAuthenticated: false,
                    user: null
            };
        default:
            return state
    }
}