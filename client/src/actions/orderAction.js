import axios from 'axios'
import {
    tokenConfig
} from './authAction'
import {
    returnError
} from './errorAction'
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
    CLEAR_ERROR
} from './types'


export const getAllOrder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LOADING
        })

        const res = await axios.get('/api/v1/order', tokenConfig(getState))

        dispatch({
            type: ORDER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'FETCH_ORDERS_FAIL'))
    }
}

export const postOrder = id => async (dispatch, getState) => {
    try {

        const body = JSON.stringify({
            menuId: id
        })
        const res = await axios.post('/api/v1/order/', body, tokenConfig(getState))

        dispatch({
            type: POST_ORDER,
            payload: res.data
        })

        dispatch(getAllOrder())

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'POST_ORDER_FAIL'))
    }
}


export const updateOrderQuantity = (data, id) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({
            quantity: Number(data)
        })
        const res = await axios.put(`/api/v1/order/${id}`, body, tokenConfig(getState))

        dispatch({
            type: UPDATE_ORDER_QUANTITY,
            payload: res.data
        })
        dispatch(getAllOrder())

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'UPDATE_ORDER_QUANTITY_FAIL'))
    }
}

export const updateOrderStatus = (data, id) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify(data)
        const res = await axios.patch(`/api/v1/order/${id}`, body, tokenConfig(getState))

        dispatch({
            type: UPDATE_ORDER_STATUS,
            payload: res.data
        })
        dispatch(getAllOrder())
        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'UPDATE_ORDER_QUANTITY_FAIL'))
    }
}

export const deleteOrder = id => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`/api/v1/order/${id}`, tokenConfig(getState))

        dispatch({
            type: DELETE_ORDER,
            payload: {
                id,
                msg: res.data.msg
            }
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'DELETE_ORDER_FAIL'))
    }
}

// fetch for specific user

export const fetchUserOrderHistory = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_HISTORY_LOADING
        })

        const res = await axios.get('/api/v1/user/order', tokenConfig(getState))

        dispatch({
            type: FETCH_USER_HISTORY,
            payload: res.data
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'FETCH_USER_ORDER_FAIL'))
    }
}

export const updateUserOrder = data => async (dispatch, getState) => {
    try {
        const body = JSON.stringify(data)
        const res = await axios.put('/api/v1/user/order', body, tokenConfig(getState))

        dispatch({
            type: UPDATE_USER_ORDER_PAYMENT,
            payload: res.data
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'UPDATE_USER_ORDER_FAIL'))
    }
}

export const totalSales = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('/api/v1/order/total', tokenConfig(getState))

        dispatch({
            type: TOTAL,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'FETCH_TOTAL_SALES_FAIL'))
    }
}