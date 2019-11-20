import actions from './actions'

const initialState = {
  loading: false,
  refreshing: false,
  more_pages: false,
  new_post: {},
  current_post: {},
  posts: [],
  role_models: [],
  editing_post: {},
  current_role_model: {},
  current_role_model_posts: [],
}

export default function roleModelsReducer(state = initialState, action) {
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
      const newArray = state[`${payload.arrayName}`].filter((element) => element.id !== payload.id)
      state[`${payload.arrayName}`] = newArray
      return state
    }
    case actions.ADD_ARRAY_ELEMENT: {
      const newArray = state[`${payload.arrayName}`].concat(payload.newElement)
      state[`${payload.arrayName}`] = newArray
      return state
    }
    case actions.REPLACE_ARRAY_ELEMENT: {
      const newArray = state[`${payload.arrayName}`]
      let foundIndex = newArray.findIndex(e => e.id == payload.id)
      newArray[foundIndex] = payload.newElement
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