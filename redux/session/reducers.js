import actions from './actions'

const initialState = {
  id: '',
  name: '',
  role: '',
  email: '',
  avatar: '',
  current_user: {},
  current_user_edition: {},
  authorized: false,
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
