import actions from './actions'

const initialState = {
  current_user: {},
  current_group: null,
  current_user_edition: {},
  isSuperAdmin: false,
  myGroups: [],
  loading: false,
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESET_APP:
      return initialState
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
