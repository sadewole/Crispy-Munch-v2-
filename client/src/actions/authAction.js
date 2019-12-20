import axios from 'axios';
import {
    AUTH_REGISTER,
    AUTH_ERROR,
    AUTH_LOGIN,
    CLEAR_ERROR
} from './types';
import {
    returnError
} from './errorAction'



export const register = data => async (dispatch) => {
    try {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        // body
        const body = JSON.stringify(data)

        const res = await axios.post('/api/v1/user/signup', body, config)
        dispatch({
            type: AUTH_REGISTER,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'REGISTER_FAIL'))
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const login = data => async (dispatch) => {
    try {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        // body
        const body = JSON.stringify(data)

        const res = await axios.post('/api/v1/user/signin', body, config)

        dispatch({
            type: AUTH_LOGIN,
            payload: res.data
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'LOGIN_FAIL'))
        dispatch({
            type: AUTH_ERROR
        })
    }
}