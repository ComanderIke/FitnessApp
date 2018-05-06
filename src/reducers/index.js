import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import workouts from './workouts'

export default combineReducers({
    todos,
    visibilityFilter,
    workouts
})