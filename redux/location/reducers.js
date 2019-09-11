import actions from './actions'

const initialState = {
  current_location: {coords: {},  structured_formatting: {main_text: null}},
  origin_location: {coords: {},  structured_formatting: {main_text: null}},
  destiny_location: {coords: {},  structured_formatting: {main_text: null}},
  origin_search: null,
  destiny_search: null,
  origin_predictions: [],
  destiny_predictions: [],
  date: null,
  time: null,
  comment: null,
  actual_locality: null,
  actual_region: {
    latitude: 5.5995259,
    longitude: -74.8030171,
    latitudeDelta: 10.0922,
    longitudeDelta: 10.0421,
  },
  locality: null,
  loading: false
}

export default function locationsReducer(state = initialState, action) {
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
