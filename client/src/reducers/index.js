import {
    combineReducers
} from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import catalogReducer from './catalogReducer'
import userReducer from './userReducer'
import orderReducer from './orderReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    menu: catalogReducer,
    user: userReducer,
    order: orderReducer
})