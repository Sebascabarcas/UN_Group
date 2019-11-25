import actions from './actions'

const initialState = {
  loadingModalVisible: false,
  confirmModalVisible: false,
  confirmDispatchAction: null
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
    case actions.SET_STATE:
      // console.log({ ...state, ...action.payload })
      return { ...state, ...action.payload }
    default:
      return state
  }
}
