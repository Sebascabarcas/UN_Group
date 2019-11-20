import { all } from 'redux-saga/effects'
// import admin from './admin/sagas'
import session from './session/sagas'
// import menu from './menu/sagas'
// import steps from './steps/sagas'
// import settings from './settings/sagas'
// import jurisdictions from './jurisdictions/sagas'
// import competences from './competences/sagas'
// import offices from './offices/sagas'
import events from './events/sagas'
import groups from './groups/sagas'
import roleModels from './roleModels/sagas'

export default function* rootSaga() {
  // yield all([
  //   admin(),
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
    events(),
    roleModels(),
    groups(),
  ])
}
