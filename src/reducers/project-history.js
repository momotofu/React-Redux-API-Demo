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
      // changing server semantics to client semantics for clarity
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.historyItems.map(item => ({
          ...item,
          itemID: createUUID(),
          buildID: item.build_id,
          timeStarted: item.time_started,
          percentageComplete: item.percentage_complete,
          build: {
            timeStamp: item.build.time_stamp,
            isCompleted: item.build.is_completed
          },
          unitTest: {
            ...item.unit_test,
            coveredPercentage: item.unit_test.covered_percentage,
            testsPassed: item.unit_test.tests_passed,
            isComplete: item.unit_test.is_complete,
          },
          functionalTest: {
            ...item.unit_test,
            coveredPercentage: item.unit_test.covered_percentage,
            testsPassed: item.unit_test.tests_passed,
            isComplete: item.unit_test.is_complete,
          },
          open: false
        })),
        lastUpdated: action.timeStamp
      })
    case ACTIONS.TOGGLE_ACCORDION_ITEM:
      return Object.assign({}, state, {
        items: state.items.map((item) => {
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
      })
    default:
      return state
  }
}

export default projectHistory