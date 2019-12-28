import {
    combineReducers
} from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import catalogReducer from './catalogReducer'
import userReducer from './userReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    menu: catalogReducer,
    user: userReducer
})