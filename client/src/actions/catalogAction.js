import axios from 'axios'
import {
    MENU_LOADED,
    MENU_LOADING,
    FETCH_SINGLE_MENU,
    POST_MENU,
    UPDATE_MENU,
    CLEAR_SINGLE_MENU_STATE,
    DELETE_MENU
} from './types'
import {
    returnError
} from './errorAction'
import {
    tokenConfig
} from './authAction'


export const fetchMenu = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MENU_LOADING
        })

        const res = await axios.get(`/api/v1/menu/`, tokenConfig(getState))

        dispatch({
            type: MENU_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'FETCH_MENU_FAIL'))
    }
}


export const postMenu = (data, handleOk) => async (dispatch, getState) => {
    try {
        const res = await axios.post(`/api/v1/menu`, data, tokenConfig(getState))

        dispatch({
            type: POST_MENU,
            payload: res.data
        })
        await handleOk()

    } catch (err) {
        console.log(err)
        dispatch(returnError(err.response.status, err.response.data, 'POST_MENU_FAIL'))
    }
}


export const getSingleMenu = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: MENU_LOADING
        })

        const res = await axios.get(`/api/v1/menu/${id}`, tokenConfig(getState))

        dispatch({
            type: FETCH_SINGLE_MENU,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'FETCH_SINGLE_MENU_FAIL'))
    }
}

export const updateMenu = (data, id, handleOk) => async (dispatch, getState) => {
    try {

        const res = await axios.put(`/api/v1/menu/${id}`, data, tokenConfig(getState))

        dispatch({
            type: UPDATE_MENU,
            payload: res.data
        })
        handleOk()
        dispatch(fetchMenu())
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'UPDATE_MENU_FAIL'))
    }
}

export const deleteMenu = id => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`/api/v1/menu/${id}`, tokenConfig(getState))

        dispatch({
            type: DELETE_MENU,
            payload: {
                id,
                msg: res.data.msg
            }
        })
        dispatch(fetchMenu())
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'DELETE_MENU_FAIL'))
    }
}

export const clearSingleMenuState = () => dispatch => {
    dispatch({
        type: CLEAR_SINGLE_MENU_STATE
    })
}