import { createStore } from 'redux'
import reducer from './reducer'


const initState = {
    PageTypeState: {
        pageType: 1
    },
    translateData: {
        singleDataArr: []
    },
    translateHistory: {
        translateHistoryArr: []
    }
}

export default createStore(reducer, initState)