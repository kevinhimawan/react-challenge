import { createStore, applyMiddleware, combineReducers } from 'redux'
import newsReducer from './news/reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  news: newsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store