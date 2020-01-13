import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleWare = [thunk]

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initState = {}

const store = createStore(rootReducer, initState, composeEnhances(applyMiddleware(...middleWare)))

export default store;