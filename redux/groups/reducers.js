import actions from './actions'

const initialState = {
  loading: false,
  refreshing: false,
  groups: [],
  current_group: {groupPictures: []},
  current_group_members: [],
  new_group: {},
  more_pages: false,
}

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESET_APP:
      return initialState
    case actions.CONCAT_GROUPS: {
      const groups = state.groups.concat(action.payload.groups)
      state.groups = groups
      return state
    }
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
