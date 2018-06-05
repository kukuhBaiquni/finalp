import {combineReducers} from 'redux'
import data from './data'
import user from './user'
import utility from './utility'

const rootReducer = combineReducers({
  data, user, utility
})

export default rootReducer
