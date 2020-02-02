import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_REGISTER,
    AUTH_ERROR,
    AUTH_LOGIN,
    CLEAR_ERROR,
    EMAIL_VERIFICATION,
    RESET_STATE,
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
        console.log(err);

        dispatch(returnError(err.response.status, err.response.data, 'LOAD_USER_FAIL'))
    }
}


export const oauthGoogle = data => async dispatch => {
    try {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const body = JSON.stringify({
            access_token: data
        })
        const res = await axios.post('/api/v1/user/oauth/google', body, config)

        console.log(res.data)

        dispatch({
            type: AUTH_REGISTER,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'OAUTH_GOOGLE_FAIL'))
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const oauthFacebook = data => async dispatch => {
    try {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const body = JSON.stringify({
            access_token: data
        })
        const res = await axios.post('/api/v1/user/oauth/facebook', body, config)

        dispatch({
            type: AUTH_REGISTER,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'OAUTH_FACEBOOK_FAIL'))
        dispatch({
            type: AUTH_ERROR
        })
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
        console.log(err)
        dispatch(returnError(err.response.status, err.response.data, 'LOGIN_FAIL'))
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

export const forgotPassword = email => async dispatch => {
    try {
        // Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const body = JSON.stringify(email)
        const res = await axios.post('/api/v1/user/verify', body, config)

        dispatch({
            type: EMAIL_VERIFICATION,
            payload: res.data
        })

        dispatch({
            type: CLEAR_ERROR
        })
    } catch (err) {
        dispatch(returnError(err.response.status, err.response.data, 'EMAIL_VERIFICATION_FAILED'))
    }
}

export const resetState = () => dispatch => {
    dispatch({
        type: RESET_STATE
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