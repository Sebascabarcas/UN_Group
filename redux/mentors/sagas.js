import { ToastAndroid } from 'react-native';
import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import {errorMessage} from '../../services/helpers';
import { createActivity, createAvailability, updateActivity, updateActivityAvailability, deleteActivity, deleteAvailability, getMentors, getMentorActivities, getActivityAvailability, getActivityAvailabilities, searchActivity } from '../../services/Mentors';
// import moment from 'moment-timezone'
// import 'moment/locale/es'  // without this line it didn't work
// moment.locale('es')
// import { errorMessage } from '../../services/helpers'


export function* SEARCH_ACTIVITIES({ payload: { searchQuery, skipLoading } }) {
  yield put({
    type: 'models/SET_STATE',
    payload: {
      loading: true,
    }
  })
  try {
    const {activities} = yield call(searchActivity, searchQuery, { skipLoading })
    
    yield put({
      type: 'models/SET_STATE',
      payload: {
        activities
      }
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'models/SET_STATE',
    payload: {
      loading: false,
    }
  })
}

export function* CREATE_ACTIVITY({ payload: { userId, goBack, activity, navigate, skipLoading } }) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const {activity: new_activity} = yield call(createActivity, userId, activity, {skipLoading});
    yield put({
      type: 'mentors/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_mentor_activities',
        newElement: new_activity
      }
    })
    ToastAndroid.show ('!Actividad creada correctamente!', ToastAndroid.SHORT);
    goBack()
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* CREATE_AVAILABILITY({ payload: { userId, availability, navigate, skipLoading } }) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const {availability: new_availability} = yield call(createAvailability, userId, availability, {skipLoading});
    yield put({
      type: 'mentors/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_activity_availabilities',
        newElement: new_availability
      }
    })
    ToastAndroid.show ('!Disponibilidad agregada correctamente!', ToastAndroid.SHORT);
    navigate('RoleModels')
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* UPDATE_ACTIVITY({ payload: { activityId, activity, navigate, goBack, skipLoading } }) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const {activity: modified_activity} = yield call(updateActivity, activityId, activity, {skipLoading});
    yield put({
      type: 'mentors/REPLACE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'mentor_activities',
        id: activity.id,
        newElement: modified_activity
      }
    })
    yield put({
      type: 'mentors/SET_STATE',
      payload: {
        current_activity: {...activity, ...modified_activity}
      }
    })
    ToastAndroid.show ('¡Actividad editada correctamente!', ToastAndroid.SHORT);
    goBack();
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* UPDATE_AVAILABILITY({ payload: { availabilityId, availability, navigate, goBack, skipLoading } }) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const {availability: modified_availability} = yield call(updateActivityAvailability, availabilityId, availability, {skipLoading});
    yield put({
      type: 'mentors/REPLACE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_activity_availabilities',
        id: availability.id,
        newElement: modified_availability
      }
    })
    yield put({
      type: 'mentors/SET_STATE',
      payload: {
        current_availability: {...availability, ...modified_availability}
      }
    })
    ToastAndroid.show ('¡Disponibilidad editada correctamente!', ToastAndroid.SHORT);
    goBack();
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_ACTIVITY({ payload: {activityId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    yield call(deleteActivity, activityId, {skipLoading});
    // console.log();
    yield put({
      type: 'mentors/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_role_model_posts',
        id: activityId
      },
    })
    yield put({
      type: 'mentors/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_activity_availabilities',
        id: activityId
      },
    })
    ToastAndroid.show ('¡Disponibilidad eliminada correctamente!', ToastAndroid.SHORT);
    goBack()
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_AVAILABILITY({ payload: {availabilityId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    yield call(deleteAvailability, availabilityId, {skipLoading});
    // console.log();
    yield put({
      type: 'mentors/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_activity_availabilities',
        id: availabilityId
      },
    })
    ToastAndroid.show ('¡Disponibilidad eliminada correctamente!', ToastAndroid.SHORT);
    // goBack()
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_MENTORS({payload: {groupId, skipLoading, concat}}) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relations} = yield call(getMentors, groupId, { skipLoading })
    yield put({
      type: `mentors/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        mentors: relations
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_MENTOR_ACTIVITIES({payload: {userId, skipLoading, concat}}) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {activities: mentor_activities} = yield call(getMentorActivities, userId, { skipLoading })
    yield put({
      type: `mentors/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        mentor_activities
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_ACTIVITY_AVAILABILITIES({payload: {activityId, skipLoading, concat}}) {
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {availabilities} = yield call(getActivityAvailabilities, activityId, { skipLoading })
    yield put({
      type: `mentors/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        current_activity_availabilities: availabilities
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'mentors/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.SEARCH_ACTIVITIES, SEARCH_ACTIVITIES),
    takeLatest(actions.CREATE_ACTIVITY, CREATE_ACTIVITY),
    takeLatest(actions.CREATE_AVAILABILITY, CREATE_AVAILABILITY),
    takeLatest(actions.UPDATE_ACTIVITY, UPDATE_ACTIVITY),
    takeLatest(actions.UPDATE_AVAILABILITY, UPDATE_AVAILABILITY),
    takeLatest(actions.DELETE_ACTIVITY, DELETE_ACTIVITY),
    takeLatest(actions.DELETE_AVAILABILITY, DELETE_AVAILABILITY),
    takeLatest(actions.GET_MENTORS, GET_MENTORS),
    takeLatest(actions.GET_MENTOR_ACTIVITIES, GET_MENTOR_ACTIVITIES),
    takeLatest(actions.GET_ACTIVITY_AVAILABILITIES, GET_ACTIVITY_AVAILABILITIES),
  ])
}
