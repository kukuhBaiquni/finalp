import {combineReducers} from 'redux'
import data from './data'
import user from './user'
import utility from './utility'
import comment from './comment'
import liked from './liked'

const rootReducer = combineReducers({
  data, user, utility, comment, liked
})

export default rootReducer
