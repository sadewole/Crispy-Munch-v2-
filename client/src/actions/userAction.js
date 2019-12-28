import axios from 'axios'
import {
    tokenConfig
} from './authAction'
import {
    returnError
} from './errorAction'
import {
    USER_LOADING,
    USER_LOADED,
    CLEAR_ERROR,
    ALL_USER_LOADED,
    ALL_USER_LOADING,
    USER_UPGRADED,
    DELETE_USER
} from './types'



export const loadAllUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_USER_LOADING
        })

        const res = await axios.get('/api/v1/user/', tokenConfig(getState))

        dispatch({
            type: ALL_USER_LOADED,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'LOAD_ALL_USER_FAIL'))
    }
}

export const getSingleUser = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LOADING
        })

        const res = await axios.get(`/api/v1/user/${id}`, tokenConfig(getState))

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'LOAD_SINGLE_USER_FAIL'))
    }
}

export const upgradeUser = id => async (dispatch, getState) => {
    try {
        const res = await axios.put(`/api/v1/user/${id}`, tokenConfig(getState))

        dispatch({
            type: USER_UPGRADED,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'UPGRADE_SINGLE_USER_FAIL'))
    }
}

export const deleteUser = id => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`/api/v1/user/${id}`, tokenConfig(getState))

        dispatch({
            type: DELETE_USER,
            payload: {
                msg: res.data.msg,
                id
            }
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'DELETE_USER_FAIL'))
    }
}