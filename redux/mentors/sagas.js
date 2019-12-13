import { put, call, all, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import {showResultModal, showErrorModal} from '../../services/helpers';
import { createActivity, createAvailability, updateActivity, updateActivityAvailability, deleteActivity, deleteAvailability, getMentors, getMentorActivities, getActivityAvailability, searchActivity, getActivity } from '../../services/Mentors';

export function* SEARCH_ACTIVITIES({ payload: { searchQuery, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    }
  })
  try {
    const {activities} = yield call(searchActivity, {searchQuery}, { skipLoading })
    yield put({
      type: 'mentors/SET_STATE',
      payload: {
        activities
      }
    })
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    }
  })
}

export function* CREATE_ACTIVITY({ payload: { userId, goBack, activity, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  try {
    const {activity: new_activity} = yield call(createActivity, userId, activity, {skipLoading});
    yield put({
      type: 'mentors/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'mentor_activities',
        newElement: new_activity
      }
    })
    yield showResultModal ({
      resultText: '!Actividad creada correctamente!',
      error: false
    })
    goBack()
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* CREATE_AVAILABILITY({ payload: { activityId, availability, goBack, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    availability.hourRange = `${availability.start_time} - ${availability.end_time}` 
    const {availability: new_availability} = yield call(createAvailability, activityId, availability, {skipLoading});
    yield put({
      type: 'mentors/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_activity_availabilities',
        newElement: new_availability
      }
    })
    yield showResultModal ({
      resultText: '!Disponibilidad agregada correctamente!',
      error: false
    })
    goBack()
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* UPDATE_ACTIVITY({ payload: { activityId, activity, navigate, goBack, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showResultModal ({
      resultText: '¡Actividad editada correctamente!',
      error: false
    })
    goBack();
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* UPDATE_AVAILABILITY({ payload: { availabilityId, availability, navigate, goBack, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showResultModal ({
      resultText: '¡Disponibilidad editada correctamente!',
      error: false
    })
    goBack();
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* DELETE_ACTIVITY({ payload: {activityId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    yield call(deleteActivity, activityId, {skipLoading});
    // console.log();
    yield put({
      type: 'mentors/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'mentor_activities',
        id: activityId
      },
    })
    yield showResultModal ({
      resultText: '¡Actividad eliminada correctamente!',
      error: false
    })
    navigate('Mentoring')
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* DELETE_AVAILABILITY({ payload: {availabilityId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showResultModal ({
      resultText: '¡Disponibilidad eliminada correctamente!',
      error: false
    })
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* GET_MENTORS({payload: {groupId, skipLoading, concat}}) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_MENTOR_ACTIVITIES({payload: {userId, skipLoading, concat}}) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_ACTIVITY({payload: {activityId, skipLoading, concat}}) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  try {
    const {activity} = yield call(getActivity, activityId, { skipLoading })
    yield put({
      type: `mentors/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        current_activity: activity,
        current_activity_availabilities: activity.availabilities
      },
    })
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
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
    takeLatest(actions.SEARCH_ACTIVITIES, SEARCH_ACTIVITIES),
    takeLatest(actions.CREATE_ACTIVITY, CREATE_ACTIVITY),
    takeLatest(actions.CREATE_AVAILABILITY, CREATE_AVAILABILITY),
    takeLatest(actions.UPDATE_ACTIVITY, UPDATE_ACTIVITY),
    takeLatest(actions.UPDATE_AVAILABILITY, UPDATE_AVAILABILITY),
    takeLatest(actions.DELETE_ACTIVITY, DELETE_ACTIVITY),
    takeLatest(actions.DELETE_AVAILABILITY, DELETE_AVAILABILITY),
    takeLatest(actions.GET_MENTORS, GET_MENTORS),
    takeLatest(actions.GET_MENTOR_ACTIVITIES, GET_MENTOR_ACTIVITIES),
    takeLatest(actions.GET_ACTIVITY, GET_ACTIVITY),
  ])
}
