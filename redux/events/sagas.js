import { ToastAndroid } from 'react-native';
import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import { createEvent, getEvent, getEvents, getEventAtendees, createTask, editTask, getEventTasks, deleteTask, getEventTask, deleteEvent, editEvent, completeTask } from '../../services/Events';
import {fromJsonToFormData, errorMessage} from '../../services/helpers';
import moment from 'moment';
import { getUserEvents } from '../../services/Session';
import { getLocation } from '../../services/Location';
// import moment from 'moment-timezone'
// import 'moment/locale/es'  // without this line it didn't work
// moment.locale('es')
// import { errorMessage } from '../../services/helpers'


export function* FIND_LOCATION({payload: {current_event, event, navigate}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
      payload: {[current_event]: {...event, latitude, longitude, location: `${event.typeOfRoad} ${event.mainRoad} # ${event.secondaryRoad} - ${event.roadNumber}`}}
    })
    navigate('AddLocation', {current_event})
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
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* CREATE_EVENT({ payload: { groupId, event, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    // event.date = moment.tz(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A', 'America/Bogota')._d
    // event.date = moment(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A').format()
    event.date = moment(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A').format()
    // console.log(event.date);
    // event = fromJsonToFormData(event)
    // console.log(event);
    yield call(createEvent, groupId, event, {skipLoading});
    ToastAndroid.show ('Evento creado correctamente!', ToastAndroid.SHORT);
    navigate('Invitations')
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* UPDATE_EVENT({ payload: { event, userId, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    // event.date = moment.tz(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A', 'America/Bogota')._d
    // event.date = moment(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A').format()
    event.date = moment(`${event.date}, ${event.time}`, 'YYYY-MM-DD, hh:mm A').format()
    // console.log(event.date);
    // event = fromJsonToFormData(event)
    // console.log(event);
    const {event: new_event} = yield call(editEvent, event.id, event, {skipLoading});
    yield put({
      type: 'groups/REPLACE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_group_events',
        id: event.id,
        newElement: new_event
      }
    })
    yield put({
      type: 'events/REPLACE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'events',
        id: event.id,
        newElement: {...event, ...new_event}
      }
    })
    yield put({
      type: 'events/SET_STATE',
      payload: {
        current_event: {...event, ...new_event}
      }
    })
    ToastAndroid.show ('Evento editado correctamente!', ToastAndroid.SHORT);
    navigate('ShowEvent', {isGroupEvent: true})
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* CREATE_TASK({ payload: { eventId, task, goBack, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    const {task: new_task} = yield call(createTask, eventId, task, {skipLoading});
    yield put({
      type: 'events/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_event_tasks',
        newElement: new_task
      }
    })
    ToastAndroid.show ('Tarea creada correctamente!', ToastAndroid.SHORT);
    goBack();
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* EDIT_TASK({ payload: {task, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    const {task: new_task} = yield call(editTask, task.id, task, {skipLoading});
    // console.log();
    yield put({
      type: 'events/REPLACE_ARRAY_ELEMENT',
      payload: {
        newElement: new_task,
        arrayName: 'current_event_tasks',
        id: task.id
      },
    })
    ToastAndroid.show ('Tarea editada correctamente!', ToastAndroid.SHORT);
    // goBack()
    navigate('MyEvents');
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* TOGGLE_TASK_COMPLETED({ payload: {taskId, completed, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    const {task: new_task} = yield call(editTask, taskId, {completed}, {skipLoading});
    // console.log();
    yield put({
      type: 'events/REPLACE_ARRAY_ELEMENT',
      payload: {
        newElement: new_task,
        arrayName: 'current_event_tasks',
        id: taskId
      },
    })
    ToastAndroid.show ('Tarea editada correctamente!', ToastAndroid.SHORT);
    // goBack()
    navigate('MyEvents');
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* COMPLETE_TASK({ payload: {task, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    const {responsible} = yield call(completeTask, task.id, task.responsibles[0].id, {completed: true}, {skipLoading});
    // console.log();
    yield put({
      type: 'groups/REPLACE_ARRAY_ELEMENT',
      payload: {
        newElement: {...task, responsibles: [responsible]},
        arrayName: 'current_user_tasks',
        id: task.id
      },
    })
    ToastAndroid.show ('Tarea completada correctamente!', ToastAndroid.SHORT);
    // goBack()
    navigate('MyGroup');
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* DELETE_EVENT({ payload: {index, eventId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    yield call(deleteEvent, eventId, {skipLoading});
    // console.log();
    /* yield put({
      type: 'groups/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_event_tasks',
        index
      },
    }) */
    ToastAndroid.show ('Evento eliminado correctamente!', ToastAndroid.SHORT);
    // goBack()
    navigate('MyGroup');
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* DELETE_TASK({ payload: {index, taskId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    yield call(deleteTask, taskId, {skipLoading});
    // console.log();
    /* yield put({
      type: 'groups/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_event_tasks',
        index
      },
    }) */
    ToastAndroid.show ('Tarea eliminada correctamente!', ToastAndroid.SHORT);
    // goBack()
    navigate('MyEvents');
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_EVENT({ payload: { id, skipLoading }, callback }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    if(callback) callback();
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_EVENTS({isSuperAdmin, userId, skipLoading, concat}) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  try {
    const {events, atendees} = yield call(isSuperAdmin ? getEvents : getUserEvents, userId, { skipLoading })
    yield put({
      type: `events/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        events: isSuperAdmin ? events : atendees.map(atendee => atendee.event)
      },
    })
  } catch (error) {
    console.log(error);
    
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_EVENT_ATENDEES({ payload: { id, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  try {
    const {atendees} = yield call(getEventAtendees, id, { skipLoading })
    yield put({
      type: 'events/SET_STATE',
      payload: {
        current_event_atendees: atendees,
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_EVENT_TASKS({ payload: { id, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_EVENT_TASK({ payload: { id, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  try {
    const {task} = yield call(getEventTask, id, { skipLoading })
    yield put({
      type: 'events/SET_STATE',
      payload: {
        current_event_task: task,
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.CREATE_EVENT, CREATE_EVENT),
    takeLatest(actions.UPDATE_EVENT, UPDATE_EVENT),
    takeLatest(actions.DELETE_EVENT, DELETE_EVENT),
    takeLatest(actions.EDIT_TASK, EDIT_TASK),
    takeLatest(actions.TOGGLE_TASK_COMPLETED, TOGGLE_TASK_COMPLETED),
    takeLatest(actions.COMPLETE_TASK, COMPLETE_TASK),
    takeLatest(actions.CREATE_TASK, CREATE_TASK),
    takeLatest(actions.DELETE_TASK, DELETE_TASK),
    takeLatest(actions.GET_EVENT_TASK, GET_EVENT_TASK),
    takeLatest(actions.GET_EVENT_TASKS, GET_EVENT_TASKS),
    takeLatest(actions.FIND_LOCATION, FIND_LOCATION),
    takeLatest(actions.GET_EVENTS, GET_EVENTS),
    takeLatest(actions.GET_EVENT, GET_EVENT),
    takeLatest(actions.GET_EVENT_ATENDEES, GET_EVENT_ATENDEES),
    // takeEvery(actions.DELETE_LOCATION, DELETE_LOCATION),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
