import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  createGroup, getGroup,
} from '../../services/Groups'
import {ToastAndroid} from 'react-native'
import actions from './actions'
import { getGroups } from '../../services/Groups';
// import { errorMessage } from '../../services/helpers'

export function* CREATE_GROUP({ payload: { group, navigate, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const success = yield call(createGroup, group, {skipLoading})
    ToastAndroid.show ('Grupo creado correctamente!', ToastAndroid.SHORT);
    navigate('Groups')
    console.log(success);
  } catch (error) {
    console.log(error);
    
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
    ToastAndroid.show ('Error creando grupo!', ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_GROUPS({ payload: { skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const success = yield call(getGroups, { skipLoading })
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group: success,
      },
    })
  } catch (error) {
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_GROUP({ payload: { id, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const success = yield call(getGroup, id, { skipLoading })
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group: success,
      },
    })
  } catch (error) {
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.CREATE_GROUP, CREATE_GROUP),
    takeLatest(actions.GET_GROUPS, GET_GROUPS),
    takeLatest(actions.GET_GROUP, GET_GROUP),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
