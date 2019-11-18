import actions from './actions'

const initialState = {
  loading: false,
  refreshing: false,
  more_pages: false,
  groups: [],
  current_group: {groupPicture: null},
  current_group_members: [],
  current_group_events: [],
  current_user_tasks: [],
  current_members_search: [],
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
      console.log(state[`${payload.arrayName}`]);
      const newArray = state[`${payload.arrayName}`].filter((element) => element.id !== payload.id)
      console.log(newArray);
      
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
      console.log(newArray);
      let foundIndex = newArray.findIndex(e => e.id == payload.id)
      console.log(foundIndex);
      
      newArray[foundIndex] = payload.newElement
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
