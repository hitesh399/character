import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'
import { createLogger } from 'redux-logger'

const logger = createLogger();

export default createStore(rootReducers, process.env.NODE_ENV !== 'production' ? applyMiddleware(logger) : undefined)
