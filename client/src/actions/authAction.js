import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_REGISTER,
    AUTH_ERROR,
    AUTH_LOGIN,
    CLEAR_ERROR,
    DELETE_USER,
    LOG_OUT
} from './types';
import {
    returnError
} from './errorAction'



export const loadUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LOADING
        })

        const res = await axios.get('/api/v1/user/secret', tokenConfig(getState))

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'LOAD_USER_FAIL'))
    }
}

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

        dispatch(loadUser())
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
        dispatch(loadUser())
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'LOGIN_FAIL'))
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`/api/v1/user/${id}`, tokenConfig(getState))

        dispatch({
            type: DELETE_USER,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOG_OUT,
        payload: {
            msg: 'Logged out successfully'
        }
    })
}

export const tokenConfig = getState => {
    try {
        // get token from local storage
        const token = getState().auth.token
        // set header
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        config.headers['Authorization'] = token

        return config
    } catch (err) {
        return err
    }
}