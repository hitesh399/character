export const SET_DATA = 'SET_DATA'
export const PUSH_DATA = 'PUSH_DATA'
export const CHANGE_REQUEST_STATUS = 'CHANGE_REQUEST_STATUS'
export const SET_PRIMARY_KEY = 'SET_PRIMARY_KEY'

/**
 * 
 * @param {String} sectionName List Section name to recognize a list
 * @param {Array} data A list Data 
 * @param {Number} Which page data going to push in collection
 * 
 * @return Object
 */
export function setData(sectionName, data, page, total, info) {
    return {
        type: SET_DATA,
        payload: {
            sectionName, data, page, total, info
        }
    }
}
/**
 * 
 * @param {String} sectionName List Section name to recognize a list
 * @param {Array} data A list Data to push in collection 
 * @param {Number} Which page data going to push in collection
 * 
 * @return Object
 */
export function pushData(sectionName, data, page, total, info) {
    return {
        type: PUSH_DATA,
        payload: {
            sectionName, data, page, total, info
        }
    }
}

/**
 * 
 * @param {String} sectionName List Section name to recognize a list
 * @param {Boolean} status current request status
 * 
 * @return Object
 */
export function changeRequestStatus(sectionName, status) {
    return {
        type: CHANGE_REQUEST_STATUS,
        payload: {
            sectionName, status
        }
    }
}

/**
 * 
 * @param {String} sectionName List Section name to recognize a list
 * @param {String} key Table Primary key
 * 
 * @return Object
 */
export function setPrimaryKey(sectionName, key) {
    return {
        type: SET_PRIMARY_KEY,
        payload: {
            sectionName, key
        }
    }
}