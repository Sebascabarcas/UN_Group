import actions from './actions'

const initialState = {
  groups: [],
  current_group: {}
}

export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESET_APP:
      return initialState
    // case actions.ADD_LOCATION: {
    //   const locations = state.locations.concat(action.payload.new_location)
    //   state.locations = locations
    //   return state
    // }
    // case actions.POP_LOCATION: {
    //   const locations = state.locations.filter((location, i) => i !== action.payload.index)
    //   state.locations = locations
    //   return state
    // }
    case actions.SET_STATE:
      // console.log({ ...state, ...action.payload })
      return { ...state, ...action.payload }
    case actions.PLACE_PRESSED:
      return { ...state, ...action.payload }
    default:
      return state
  }
}