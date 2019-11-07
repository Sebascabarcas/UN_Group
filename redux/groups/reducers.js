import actions from './actions'

const initialState = {
  loading: false,
  refreshing: false,
  more_pages: false,
  groups: [],
  current_group: {groupPictures: []},
  current_group_members: [],
  current_group_member: {},
  current_group_requests: [],
  new_group: {},
  editing_group: {},
}

export default function groupsReducer(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case actions.RESET_APP:
      return initialState
    case actions.CONCAT_GROUPS: {
      const groups = state.groups.concat(payload.groups)
      state.groups = groups
      return state
    }
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
    case actions.REPLACE_ARRAY_ELEMENT: {
      const newArray = state[`${payload.arrayName}`][payload.index]
      state[`${payload.arrayName}`] = newArray
      return state
    }
    case actions.SET_STATE:
      // console.log({ ...state, ...payload })
      return { ...state, ...payload }
    default:
      return state
  }
}
