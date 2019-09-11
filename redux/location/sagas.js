import { put, call, all, takeEvery } from 'redux-saga/effects'
import {
  getLatLngLocation,
} from '../../services/location'
import actions from './actions'
// import { errorMessage } from '../../services/helpers'

export function* GET_CURRENT_LOCATION({ payload: { lat, lng, skipLoading } }) {
  yield put({
    type: 'locations/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const success = yield call(getLatLngLocation, lat, lng, { skipLoading })
    yield put({
      type: 'locations/SET_STATE',
      payload: {
        current_location: success,
      },
    })
  } catch (error) {
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'locations/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_LOCATION({ payload: { id, skipLoading } }) {
  yield put({
    type: 'locations/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const success = yield call(getLocation, id, { skipLoading })
    yield put({
      type: 'locations/SET_STATE',
      payload: {
        current_location: success,
      },
    })
  } catch (error) {
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'locations/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    // takeEvery(actions.DELETE_LOCATION, DELETE_LOCATION),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
