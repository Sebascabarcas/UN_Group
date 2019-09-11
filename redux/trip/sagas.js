import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  getLatLngLocation,
} from '../../services/location'
import {ToastAndroid} from 'react-native'
import actions from './actions'
import { createOrder } from '../../services/Order';
// import { errorMessage } from '../../services/helpers'

export function* CREATE_TRIP({ payload: { order, navigate, skipLoading } }) {
  yield put({
    type: 'trip/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    const success = yield call(createOrder, order)
    ToastAndroid.show ('Orden de Viaje creada!', ToastAndroid.SHORT);
    navigate('Orders')
    console.log(success);
  } catch (error) {
    console.log(error);
    
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
    ToastAndroid.show ('Error creando orden de viaje!', ToastAndroid.SHORT);
  }
  yield put({
    type: 'trip/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

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
    takeLatest(actions.CREATE_TRIP, CREATE_TRIP),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
