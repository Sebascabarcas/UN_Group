import actions from './actions'

const initialState = {
  current_user: {},
  current_group: null,
  current_user_edition: {},
  users_searched: [],
  isSuperAdmin: false,
  isRolemodel: false,
  isMentor: false,
  myGroups: [],
  myEvents: [],
  myInvitations: [],
  loading: false,
  refreshing: false,
}

export default function sessionReducer(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case actions.RESET_APP:
      return initialState
    case actions.SET_STATE:
      return { ...state, ...payload }
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
    default:
      return state
  }
}
