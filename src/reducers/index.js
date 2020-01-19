import {
    combineReducers
} from 'redux';

import TableReducer from './TableReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    table: TableReducer,
    form: formReducer
})