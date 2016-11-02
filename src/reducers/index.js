import * as ACTIONS from '../actions'
import { combineReducers } from 'redux'

function projectHistory(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case ACTIONS.INVALIDATE_REQUEST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case ACTIONS.REQUEST_HISTORY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ACTIONS.RECEIVE_HISTORY:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.history,
        lastUpdated: action.timeStamp
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  projectHistory
})

export default rootReducer