const redux = require('redux')

const createStore = redux.createStore


const initialState = {
  counter: 0
}
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_COUNTER':
      return {
        ...state,
        counter: state.counter + 1
      }
      break;
    case 'ADD_COUNTER':
      return {
        ...state,
        counter: state.counter + action.value
      }
      break
    default:
      return state
      break;
  }
  return state
}


// Store
const store = createStore(rootReducer)
console.log(store.getState())

// subscriptions
store.subscribe(() => {
  console.log('[Subscr]', store.getState())
})

// Action
store.dispatch({
  type: 'INC_COUNTER'
})
store.dispatch({
  type: 'ADD_COUNTER', value: 10
})
console.log(store.getState())

