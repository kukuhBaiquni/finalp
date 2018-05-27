import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'

export default function configureStore(initialState){
  const enhancer = applyMiddleware(thunkMiddleware)
  const store = createStore(rootReducer, initialState, enhancer)
  return store
}
