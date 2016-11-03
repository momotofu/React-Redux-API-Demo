import * as ACTIONS from '../actions'
import { combineReducers } from 'redux'
import projectHistory from './project-history'

const rootReducer = combineReducers({
  projectHistory
})

export default rootReducer