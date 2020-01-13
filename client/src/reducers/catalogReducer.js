import {
    MENU_LOADED,
    MENU_LOADING,
    FETCH_SINGLE_MENU,
    POST_MENU,
    UPDATE_MENU,
    DELETE_MENU
} from '../actions/types'

const initState = {
    isLoading: true,
    msg: '',
    data: [],
    singleData: null
}

export default (state = initState, action) => {
    const {
        payload,
        type
    } = action

    switch (type) {
        case MENU_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case MENU_LOADED:
            return {
                ...state,
                data: payload.data,
                    msg: payload.msg,
                    isLoading: false
            };
        case POST_MENU:
            return {
                ...state,
                data: [payload.data, ...state.data],
                    msg: payload.msg,
                    isLoading: false
            };
        case FETCH_SINGLE_MENU:
            return {
                ...state,
                singleData: payload.data,
                    msg: payload.msg,
                    isLoading: false
            };
        case UPDATE_MENU:
            return {
                ...state,
                msg: payload.msg,
                    isLoading: false
            };
        case DELETE_MENU:
            return {
                ...state,
                data: state.data.filter(item => item.id !== payload.id),
                    msg: payload.msg
            };
        default:
            return state
    }
}