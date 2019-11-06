import actions from './actions'

const initialState = {
  current_event: {},
  current_event_invitations: [],
  events: []
}

export default function eventsReducer(state = initialState, action) {
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
    case actions.DELETE_ARRAY_ELEMENT: {
      const newArray = state[`${payload.arrayName}`].filter((element, i) => i !== payload.index)
      state[`${payload.arrayName}`] = newArray
      return state
    }
    case actions.ADD_ARRAY_ELEMENT: {
      const newArray = state[`${payload.arrayName}`].concat(payload.newElement)
      state[`${payload.arrayName}`] = newArray
      return state
    }
    case actions.SET_STATE:
      // console.log({ ...state, ...action.payload })
      return { ...state, ...action.payload }
    default:
      return state
  }
}
