import { combineReducers } from 'redux'
// import admin from './admin/reducers'
// import menu from './menu/reducers'
// import settings from './settings/reducers'
// import jurisdictions from './jurisdictions/reducers'
// import competences from './competences/reducers'
// import steps from './steps/reducers'
// import offices from './offices/reducers'
// import extras from './extras/reducers'
import session from './session/reducers'
import events from './events/reducers'
import groups from './groups/reducers'
import mentors from './mentors/reducers'
import roleModels from './roleModels/reducers'

export default
  combineReducers({
    // admin,
    session,
    // jurisdictions,
    // competences,
    // menu,
    // settings,
    // steps,
    // offices,
    // extras,
    events,
    roleModels,
    mentors,
    groups,
  })
