import actions from './actions'

const initialState = {
  loading: false,
  refreshing: false,
  more_pages: false,
  new_event: {eventName: 'Nombre del Evento', date: null, time: null},
  editing_event: {},
  new_task: {taskName: 'Nombre de la tarea'},
  editing_task: {},
  current_event: {},
  current_event_atendees: [],
  current_event_invitations: [],
  current_event_task: {responsibles: []},
  current_event_tasks: [],
  events: []
}

export default function eventsReducer(state = initialState, action) {
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
      const newArray = state[`${payload.arrayName}`]
      let foundIndex = newArray[payload.index].findIndex(e => e.id == payload.id)
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
