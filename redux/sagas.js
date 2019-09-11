import { all } from 'redux-saga/effects'
// import admin from './admin/sagas'
import session from './session/sagas'
// import menu from './menu/sagas'
// import steps from './steps/sagas'
// import settings from './settings/sagas'
// import jurisdictions from './jurisdictions/sagas'
// import competences from './competences/sagas'
// import offices from './offices/sagas'
import location from './location/sagas'
import trip from './trip/sagas'

export default function* rootSaga() {
  // yield all([
  //   admin(),
  //   location(),
  //   session(),
  //   jurisdictions(),
  //   competences(),
  //   steps(),
  //   offices(),
  //   menu(),
  //   settings(),
  // ])
  yield all([
    session(),
    location(),
    trip(),
  ])
}
