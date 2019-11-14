import { ToastAndroid } from 'react-native';
import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import { createEvent, getEvent, getEvents, getEventAttendees, createTask } from '../../services/Events';
import {fromJsonToFormData, errorMessage} from '../../services/helpers';
import moment from 'moment';
import { getUserEvents } from '../../services/Session';
import { getLocation } from '../../services/Location';
// import moment from 'moment-timezone'
// import 'moment/locale/es'  // without this line it didn't work
// moment.locale('es')
// import { errorMessage } from '../../services/helpers'


export function* FIND_LOCATION({payload: {event, navigate}}) {
  yield put ({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    const {results} = yield call (getLocation, `${event.typeOfRoad}%20${event.mainRoad}%20%23${event.secondaryRoad}-${event.roadNumber}%2C%20Barranquilla%2C%20Atl%C3%A1ntico`);
    console.log(results);
    let location_result = results[0] || {geometry: {location: {lat: 10.966981761315, lng: -74.79788233489182}}}
    const {geometry: {location: {lat: latitude, lng: longitude}}} = location_result
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
    yield put({
      type: 'events/SET_STATE',
      payload: {new_event: {...event, latitude, longitude, location: `${event.typeOfRoad} ${event.mainRoad} # ${event.secondaryRoad} - ${event.roadNumber}`}}
    })
    navigate('AddLocation')
    // ToastAndroid.show (
    //   'Usuario registrado, porfavor ingrese con su identificación y contraseña',
    //   ToastAndroid.SHORT
    // );
    // navigate ('SignIn');
  } catch (error) {
    console.log (error);
    ToastAndroid.show (
      'Error encontrando dirección, verifique los campos',
      ToastAndroid.SHORT
    );
  }
  yield put ({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* CREATE_EVENT({ payload: { groupId, event, navigate, skipLoading } }) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    // event.date = moment.tz(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A', 'America/Bogota')._d
    // event.date = moment(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A').format()
    event.date = moment(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A').format()
    // console.log(event.date);
    // event = fromJsonToFormData(event)
    // console.log(event);
    const success = yield call(createEvent, groupId, event, {skipLoading});
    console.log(success);
    
    ToastAndroid.show ('Evento creado correctamente!', ToastAndroid.SHORT);
    navigate('Events')
    // console.log(success);
  } catch (error) {CREATE_EVENT
    CREATE_EVENT
    console.log('CREATE_EVENT, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
    ToastAndroid.show ('Error creando evento!', ToastAndroid.SHORT);
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* CREATE_TASK({ payload: { eventId, task, navigate, skipLoading } }) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const success = yield call(createTask, eventId, task, {skipLoading});
    console.log(success);
    
    ToastAndroid.show ('Evento creado correctamente!', ToastAndroid.SHORT);
    navigate('Events')
    // console.log(success);
  } catch (error) {CREATE_EVENT
    CREATE_EVENT
    console.log('CREATE_EVENT, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
    ToastAndroid.show ('Error creando evento!', ToastAndroid.SHORT);
  }
  yield put({
    type: 'events/SET_STATE',
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

export function* GET_EVENTS({isSuperAdmin, userId, skipLoading, concat}) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {events, atendees} = yield call(isSuperAdmin ? getEvents : getUserEvents, userId, { skipLoading })
    yield put({
      type: `events/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        events: isSuperAdmin ? events : atendees
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

export function* GET_EVENT_TASKS({ payload: { id, skipLoading } }) {
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {tasks} = yield call(getEventTasks, id, { skipLoading })
    yield put({
      type: 'events/SET_STATE',
      payload: {
        current_event_tasks: tasks,
      },
    })
  } catch (error) {
    console.log('GET_EVENT_TASKS, ERROR:', error);
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
    takeLatest(actions.CREATE_TASK, CREATE_TASK),
    takeLatest(actions.GET_EVENT_TASKS, GET_EVENT_TASKS),
    takeLatest(actions.FIND_LOCATION, FIND_LOCATION),
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
