import {
    USER_LOADING,
    USER_LOADED,
    DELETE_USER,
    ALL_USER_LOADED,
    ALL_USER_LOADING,
    USER_UPGRADED
} from '../actions/types'

const initState = {
    isLoading: true,
    // user: [],
    allUser: [],
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
            // case USER_LOADED:
            //     return {
            //         ...state,
            //         isLoading: false,
            //             user: payload.data,
            //             msg: payload.msg
            //     };
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
        case DELETE_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                allUser: state.allUser.filter(user => user.id !== payload.id),
                    msg: payload.msg
            }
            default:
                return state
    }
}