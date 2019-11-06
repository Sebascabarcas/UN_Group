import { put, call, all, takeEvery } from 'redux-saga/effects'
import actions from './actions'
// import { errorMessage } from '../../services/helpers'

export default function* rootSaga() {
  yield all([
    // takeEvery(actions.DELETE_LOCATION, DELETE_LOCATION),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
