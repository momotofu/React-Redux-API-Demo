import * as ACTIONS from '../actions'
import { createUUID } from '../utilities/math.js'

function projectHistory(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case ACTIONS.INVALIDATE_REQUEST:
      return {
        ...state,
        didInvalidate: true
      }
    case ACTIONS.REQUEST_HISTORY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case ACTIONS.RECEIVE_HISTORY:
      // changing server semantics to client semantics for clarity
      return {
        isFetching: false,
        didInvalidate: false,
        items: action.historyItems.map(item => ({
          buildID: item.build_id,
          itemID: createUUID(),
          itemState: item.state,
          owner: item.owner,
          open: false,
          percentageComplete: item.percentage_complete,
          timeStarted: item.time_started,
          metrics: {
            test: item.metrics.test,
            maintainability: item.metrics.maintainability,
            security: item.metrics.security,
            workmanship: item.metrics.workmanship,
            isCompleted: item.metrics.is_completed
          },
          build: {
            timeStamp: item.build.time_stamp,
            isCompleted: item.build.is_completed
          },
          unitTest: {
            passed: item.unit_test.passed,
            failed: item.unit_test.failed,
            coveredPercentage: item.unit_test.covered_percentage,
            testsPassed: item.unit_test.tests_passed,
            isCompleted: item.unit_test.is_completed
          },
          functionalTest: {
            passed: item.functional_test.passed,
            failed: item.functional_test.failed,
            coveredPercentage: item.functional_test.covered_percentage,
            testsPassed: item.functional_test.tests_passed,
            isCompleted: item.functional_test.is_completed
          },
          result: {
            ...item.result
          }
        })),
        lastUpdated: action.timeStamp
      }
    case ACTIONS.TOGGLE_ACCORDION_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.itemID !== action.id)
            return {
              ...item,
              open: false
            }
          return {
            ...item,
            open: !item.open
          }
        })
      }
    default:
      return state
  }
}

export default projectHistory
