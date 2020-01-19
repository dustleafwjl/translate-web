import { combineReducers }  from 'redux'
import { TOTYPEFILE, TOTYPESINGLE, SETSINGLEDATA } from './action'

function PageTypeState(state = {}, action) {
    switch (action.type) {
        case TOTYPEFILE:
            return Object.assign({}, state, {
                pageType: action.value
            })
        case TOTYPESINGLE:
            return Object.assign({}, state, {
                pageType: action.value
            })
        default:
            return state
    }
}

function translateData(state = {}, action) {
    switch (action.type) {
        case SETSINGLEDATA :
            return Object.assign({}, state, {
                singleDataArr: action.value
            })
        default:
            return state
    }
}

export default combineReducers({
    PageTypeState,
    translateData
})