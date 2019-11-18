import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  createGroup, getGroups, getGroup, getGroupMembers, sendGroupMemberRequest, getGroupCandidates, acceptMember, kickGroupMember, increasePrivileges, reducePrivileges, updateGroup, leaveGroup, addMember, getGroupEvents, deleteGroup, getUserTasks
} from '../../services/Groups'
import {
  currentSession,
} from '../../services/Session';
import Storage from '../../services/Storage';
import {ToastAndroid} from 'react-native'
import actions from './actions'
import {fromJsonToFormData, errorMessage} from '../../services/helpers';
import { element } from 'prop-types';
// import { errorMessage } from '../../services/helpers'

export function* CREATE_GROUP({ payload: { group, groups, navigate, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    group = fromJsonToFormData(group)
    const {group: new_group} = yield call(createGroup, group, {skipLoading});
    yield put({
      type: 'groups/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'groups',
        newElement: new_group
      },
    })
    const current_session = yield call (currentSession);
    if (current_session) {
      groups.push(new_group)
      current_session.groups = groups;
      current_session.current_group = new_group;
      yield put ({
        type: 'session/SET_STATE',
        payload: {
          current_group: new_group,
          myGroups: groups
        },
      });
      yield call (
        Storage.set,
        'Session',
        current_session
      );
    }
    ToastAndroid.show ('Grupo creado correctamente!', ToastAndroid.SHORT);
    navigate('Groups')
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* UPDATE_GROUP({ payload: { id, group, isSuperAdmin, navigate, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    group = fromJsonToFormData(group)
    // console.log(group);
    const {group: modified_group} = yield call(updateGroup, id, group, {skipLoading});
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group: modified_group
      },
    })
    const current_session = yield call (currentSession);
    console.log(current_session);
    let _current_group = {...current_session.current_group, ...modified_group}
    if (isSuperAdmin) {
      let foundIndex = current_session.groups.findIndex(_group => _group.id == id)
      current_session.groups[foundIndex] = modified_group
      current_session.current_group = modified_group
    } else {
      let foundIndex = current_session.groups.findIndex(relation => relation.groupId == id)
      current_session.groups[foundIndex].group = _current_group
      current_session.current_group = _current_group
    }
    console.log(current_session.groups);
    
    yield put({
      type: 'session/SET_STATE',
      payload: {
        myGroups: current_session.groups,
        current_group: isSuperAdmin ? modified_group : _current_group
      },
    })
    yield call (
      Storage.set,
      'Session',
      current_session
    );
    ToastAndroid.show ('Grupo modificado correctamente!', ToastAndroid.SHORT);
    navigate('Groups')
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_GROUP_EVENTS({payload: {id, skipLoading, concat}}) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {events} = yield call(getGroupEvents, id, { skipLoading })
    console.log(events);
    
    yield put({
      type: `groups/${concat ? 'ADD_ARRAY_ELEMENT' : 'SET_STATE' }`,
      payload: {
        arrayName: 'current_group_events',
        newElement: events,
        current_group_events: events
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_GROUPS({skipLoading, concat}) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {groups} = yield call(getGroups, { skipLoading })
    yield put({
      type: `groups/${concat ? 'ADD_ARRAY_ELEMENT' : 'SET_STATE' }`,
      payload: {
        arrayName: 'groups',
        newElement: groups,
        groups
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
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
    const {group} = yield call(getGroup, id, { skipLoading })
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group: group,
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_GROUP_MEMBERS({ payload: { id, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relations} = yield call(getGroupMembers, id, { skipLoading })
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group_members: relations,
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_GROUP_CANDIDATES({ payload: { id, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relations} = yield call(getGroupCandidates, id, { skipLoading });
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group_requests: relations,
      }
    });
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_USER_TASKS({ payload: { userId, groupId, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {tasks} = yield call(getUserTasks, userId, groupId, { skipLoading });
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_user_tasks: tasks,
      }
    });
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* SEND_GROUP_REQUEST({ payload: { id, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(sendGroupMemberRequest, id, { skipLoading })
    ToastAndroid.show ('Solicitud de unión al grupo enviada!', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* INCREASE_PRIVILEGES({ payload: { id, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relation} = yield call(increasePrivileges, id, userID, { skipLoading })
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group_member: {...relation}
      },
    })
    yield put({
      type: 'groups/REPLACE_ARRAY_ELEMENT',
      payload: {
        newElement: relation,
        arrayName: 'current_group_members',
        id: relation.id
      },
    })
    ToastAndroid.show ('Incremento de privilegios!', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* REDUCE_PRIVILEGES({ payload: { id, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relation} = yield call(reducePrivileges, id, userID, { skipLoading })
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group_member: {...relation}
      },
    })
    yield put({
      type: 'groups/REPLACE_ARRAY_ELEMENT',
      payload: {
        newElement: relation,
        arrayName: 'current_group_members',
        id: relation.id
      },
    })
    ToastAndroid.show ('Incremento de privilegios!', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* ADD_GROUP_MEMBER({ payload: { id, userID, goBack, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relation} = yield call(addMember, id, userID, { skipLoading })
    yield put({
      type: 'groups/ADD_ARRAY_ELEMENT',
      payload: {
        newElement: relation,
        arrayName: 'current_group_members'
      },
    })
    ToastAndroid.show ('Nuevo miembro de grupo añadido!', ToastAndroid.SHORT);
    goBack()
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* ACCEPT_GROUP_REQUEST({ payload: { id, index, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relation} = yield call(acceptMember, id, userID, { skipLoading })
    yield put({
      type: 'groups/DELETE_ARRAY_ELEMENT',
      payload: {
        index,
        arrayName: 'current_group_requests'
      },
    })
    yield put({
      type: 'groups/ADD_ARRAY_ELEMENT',
      payload: {
        newElement: relation,
        arrayName: 'current_group_members'
      },
    })
    ToastAndroid.show ('Solicitud de unión al grupo aceptada!', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* REJECT_GROUP_REQUEST({ payload: { id, index, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(rejectMember, id, userID, { skipLoading })
    yield put({
      type: 'groups/DELETE_ARRAY_ELEMENT',
      payload: {
        index,
        arrayName: 'current_group_requests'
      },
    })
    ToastAndroid.show ('Solicitud de unión al grupo rechazada!', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_GROUP_MEMBER({ payload: { id, userID, relationId, goBack, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(kickGroupMember, id, userID, { skipLoading })
    yield put({
      type: 'groups/DELETE_ARRAY_ELEMENT',
      payload: {
        id: relationId,
        arrayName: 'current_group_members'
      },
    })
    ToastAndroid.show ('Miembro eliminado del grupo!', ToastAndroid.SHORT);
    goBack();
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LEAVE_GROUP({ payload: { id, navigate, resetNavigationStack, dispatchNavigation, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(leaveGroup, id, { skipLoading })
    dispatchNavigation(resetNavigationStack)
    const current_session = yield call (currentSession);
    if (current_session) {
      console.log('current_groups1:', current_session.groups);
      current_session.groups = current_session.groups.filter(group => group.groupId !== id) 
      console.log('current_groups2:', current_session.groups);
      
      delete current_session.current_group
      delete current_session.user.isAdmin
      current_session.current_group = current_session.groups.length > 0 ? current_session.groups[0].group : null
      current_session.user.isAdmin = current_session.current_group ? current_session.current_group.isAdmin : false
      yield call (
        Storage.set,
        'Session',
        current_session,
      );
      yield put ({
        type: 'session/SET_STATE',
        payload: {
          myGroups: current_session.groups,
          current_group: current_session.current_group,
          isAdmin: current_session.user.isAdmin
        },
      });
    }
    ToastAndroid.show ('Has dejado el grupo!', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_GROUP({ payload: { id, navigate, resetNavigationStack, dispatchNavigation, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(deleteGroup, id, { skipLoading })
    dispatchNavigation(resetNavigationStack)
    const current_session = yield call (currentSession);
    if (current_session) {
      console.log('current_groups1:', current_session.groups);
      current_session.groups = current_session.groups.filter(group => group.id !== id) 
      console.log('current_groups2:', current_session.groups);
      
      delete current_session.current_group
      delete current_session.user.isAdmin
      current_session.current_group = current_session.groups.length > 0 ? current_session.groups[0] : null
      current_session.user.isAdmin = current_session.current_group ? current_session.current_group.isAdmin : false
      yield call (
        Storage.set,
        'Session',
        current_session,
      );
      yield put ({
        type: 'session/SET_STATE',
        payload: {
          myGroups: current_session.groups,
          current_group: current_session.current_group,
          isAdmin: current_session.user.isAdmin
        },
      });
    }
    ToastAndroid.show ('Has eliminado el grupo!', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
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
    takeLatest(actions.ACCEPT_GROUP_REQUEST, ACCEPT_GROUP_REQUEST),
    takeLatest(actions.ADD_GROUP_MEMBER, ADD_GROUP_MEMBER),
    takeLatest(actions.CREATE_GROUP, CREATE_GROUP),
    takeLatest(actions.UPDATE_GROUP, UPDATE_GROUP),
    takeLatest(actions.DELETE_GROUP, DELETE_GROUP),
    takeLatest(actions.DELETE_GROUP_MEMBER, DELETE_GROUP_MEMBER),
    takeLatest(actions.GET_USER_TASKS, GET_USER_TASKS),
    takeLatest(actions.GET_GROUP_EVENTS, GET_GROUP_EVENTS),
    takeLatest(actions.GET_GROUPS, GET_GROUPS),
    takeLatest(actions.GET_GROUP, GET_GROUP),
    takeLatest(actions.GET_GROUP_MEMBERS, GET_GROUP_MEMBERS),
    takeLatest(actions.GET_GROUP_CANDIDATES, GET_GROUP_CANDIDATES),
    takeLatest(actions.INCREASE_PRIVILEGES, INCREASE_PRIVILEGES),
    takeLatest(actions.REDUCE_PRIVILEGES, REDUCE_PRIVILEGES),
    takeLatest(actions.REJECT_GROUP_REQUEST, REJECT_GROUP_REQUEST),
    takeLatest(actions.SEND_GROUP_REQUEST, SEND_GROUP_REQUEST),
    takeLatest(actions.LEAVE_GROUP, LEAVE_GROUP),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
