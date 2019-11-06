import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import { createEvent, getEvent, getEvents, getEventAttendees } from '../../services/Events';
// import { errorMessage } from '../../services/helpers'


export function* CREATE_EVENT({ payload: { groupId, event, navigate, skipLoading } }) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    event = fromJsonToFormData(event)
    console.log(event);
    
    const {event: new_event} = yield call(createEvent, groupId, event, {skipLoading});
    console.log(success);
    yield put({
      type: 'events/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'events',
        newElement: new_event
      },
    })
    ToastAndroid.show ('Evento creado correctamente!', ToastAndroid.SHORT);
    navigate('Events')
    console.log(success);
  } catch (error) {
    console.log('CREATE_EVENT, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
    ToastAndroid.show ('Error creando evento!', ToastAndroid.SHORT);
  }
  yield put({
    type: 'eventss/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_EVENT({ payload: { id, skipLoading } }) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {event} = yield call(getEvent, id, { skipLoading })
    yield put({
      type: 'events/SET_STATE',
      payload: {
        current_event: event,
      },
    })
  } catch (error) {
    console.log('GET_EVENT, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_EVENTS({skipLoading, concat}) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {events} = yield call(getEvents, { skipLoading })
    yield put({
      type: `events/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        events
      },
    })
  } catch (error) {
    console.log('GET_EVENTS, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_EVENT_ATTENDEES({ payload: { id, skipLoading } }) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relations} = yield call(getEventAttendees, id, { skipLoading })
    yield put({
      type: 'events/SET_STATE',
      payload: {
        current_event_attendees: relations,
      },
    })
  } catch (error) {
    console.log('GET_EVENT_ATTENDEES, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  })
}


export default function* rootSaga() {
  yield all([
    takeLatest(actions.CREATE_EVENT, CREATE_EVENT),
    takeLatest(actions.GET_EVENTS, GET_EVENTS),
    takeLatest(actions.GET_EVENT, GET_EVENT),
    takeLatest(actions.GET_EVENT_ATTENDEES, GET_EVENT_ATTENDEES),
    // takeEvery(actions.DELETE_LOCATION, DELETE_LOCATION),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
