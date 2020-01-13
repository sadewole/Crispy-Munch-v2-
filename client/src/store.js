import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleWare = [thunk]

<<<<<<< HEAD
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initState = {}

const store = createStore(rootReducer, initState, composeEnhances(applyMiddleware(...middleWare)))
=======
const initState = {}

const store = createStore(rootReducer, initState, compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a

export default store;