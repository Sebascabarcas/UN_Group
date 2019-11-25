import actions from './actions'

const initialState = {
  loading: false,
  refreshing: false,
  more_pages: false,
  mentors: [],
  current_mentor: {},
  current_mentor_activities: [],
  activities: [],
  mentor_activities: [],
  new_activity: {},
  current_activity: {},
  editing_activity: {},
  new_availability: {},
  editing_availability: {},
  current_activity_availabilities: [],
}

export default function mentorsReducer(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
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
      const newArray = state[`${payload.arrayName}`].filter((element) => element.id != payload.id)
      return { ...state, [`${payload.arrayName}`]: newArray }
    }
    case actions.ADD_ARRAY_ELEMENT: {
      const newArray = state[`${payload.arrayName}`].concat(payload.newElement)
      return { ...state, [`${payload.arrayName}`]: newArray }
    }
    case actions.REPLACE_ARRAY_ELEMENT: {
      const newArray = state[`${payload.arrayName}`]
      let foundIndex = newArray.findIndex(e => e.id == payload.id)
      newArray[foundIndex] = payload.newElement
      return { ...state, [`${payload.arrayName}`]: newArray }
    }
    case actions.SET_STATE:
      // console.log({ ...state, ...action.payload })
      return { ...state, ...action.payload }
    default:
      return state
  }
}
