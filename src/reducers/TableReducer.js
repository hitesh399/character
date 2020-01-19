import {
    SET_DATA,
    PUSH_DATA,
    CHANGE_REQUEST_STATUS,
    SET_PRIMARY_KEY
} from '../actions/TableActions'

import helper from 'js-object-helper'

/** 
|-------------------------------------------------------
| Data Schema which we use into to store the list data
|-------------------------------------------------------
|  {  
|    users: { 
|        data: Array[Object],
|        info: Object,
|        requesting: Boolean, 
|        shouldUpdate: Boolean, 
|        meta: {currentPage, pageSize, total, primaryKey}, 
|        lastUpdatedAt: Date
|    }
|  }
|
*/
const ALL_ACTIONS = [SET_DATA, PUSH_DATA, CHANGE_REQUEST_STATUS, SET_PRIMARY_KEY]

export default function section(state = {}, action) {

    if (!ALL_ACTIONS.includes(action.type)) return state

    const shouldUpdate = helper.getProp(state, [action.payload.sectionName, 'shouldUpdate'])
    const data = helper.getProp(action, ['payload', 'data'])
    const page = helper.getProp(action, ['payload', 'page'])
    const key = helper.getProp(action, ['payload', 'key'])
    const total = helper.getProp(action, ['payload', 'total'])
    const requestStatus = helper.getProp(action, ['payload', 'status'])
    const info = helper.getProp(action, ['payload', 'info'])
    const name = helper.getProp(action, ['payload', 'sectionName'])
    const keyName = helper.getProp(state, [name, 'meta', 'primaryKey'], 'id')
    if (action.type === SET_DATA) {
        helper.setProp(state, [name, 'data'], data)
        helper.setProp(state, [name, 'meta', 'currentPage'], page)
        helper.setProp(state, [name, 'meta', 'total'], total)
        helper.setProp(state, [name, 'lastUpdatedAt'], new Date)
        helper.setProp(state, [name, 'requesting'], false)
        helper.setProp(state, [name, 'info'], info)
        helper.setProp(state, [name, 'shouldUpdate'], !shouldUpdate)
        return { ...state }
    }
    else if (action.type === PUSH_DATA) {
        helper.pushProp(state, [name, 'data'], data, keyName, true, false)
        helper.setProp(state, [name, 'lastUpdatedAt'], new Date)
        helper.setProp(state, [name, 'meta', 'currentPage'], page)
        helper.setProp(state, [name, 'meta', 'total'], total)
        helper.setProp(state, [name, 'info'], info)
        helper.setProp(state, [name, 'requesting'], false)
        helper.setProp(state, [name, 'shouldUpdate'], !shouldUpdate)
        return { ...state }
    }
    else if (action.type === CHANGE_REQUEST_STATUS) {
        helper.setProp(state, [name, 'requesting'], requestStatus)
        helper.setProp(state, [name, 'shouldUpdate'], !shouldUpdate)
        return { ...state }
    }
    else if (action.type === SET_PRIMARY_KEY) {
        helper.setProp(state, [name, 'meta', 'primaryKey'], key)
        return { ...state }
    } else {
        return state
    }
}