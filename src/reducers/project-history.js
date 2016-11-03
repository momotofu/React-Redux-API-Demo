import * as ACTIONS from '../actions'
import { createUUID } from '../utilities/math.js'

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
        items: action.historyItems.map(item => ({
          ...item,
          item_id: createUUID(),
          open: false
        })),
        lastUpdated: action.timeStamp
      })
    case ACTIONS.TOGGLE_ACCORDION_ITEM:
      return state.items.map((item) => {
        if (item.id !== action.id)
          return {
            ...item,
            open: false
          }
        return {
          ...item,
          open: !item.open
        }
      })
    default:
      return state
  }
}

export default projectHistory