import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  createGroup, getGroups, getGroup, getGroupMembers, sendGroupMemberRequest, getGroupCandidates, acceptMember, kickGroupMember, increasePrivileges, reducePrivileges, updateGroup, leaveGroup, addMember
} from '../../services/Groups'
import {
  currentSession,
} from '../../services/Session';
import Storage from '../../services/Storage';
import {ToastAndroid} from 'react-native'
import actions from './actions'
import fromJsonToFormData from '../../services/helpers';
import { element } from 'prop-types';
// import { errorMessage } from '../../services/helpers'

export function* CREATE_GROUP({ payload: { group, navigate, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    group = fromJsonToFormData(group)
    console.log(group);
    
    const {group: new_group} = yield call(createGroup, group, {skipLoading});
    yield put({
      type: 'groups/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'groups',
        newElement: new_group
      },
    })
    ToastAndroid.show ('Grupo creado correctamente!', ToastAndroid.SHORT);
    navigate('Groups')
  } catch (error) {
    console.log('CREATE_GROUP, ERROR:', error);
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

export function* UPDATE_GROUP({ payload: { id, group, current_group, navigate, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    // group = fromJsonToFormData(group)
    console.log(group);
    const {group: modified_group} = yield call(updateGroup, id, group, {skipLoading});
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group: modified_group
      },
    })
    if (current_group) {
      const current_session = yield call (currentSession);
      current_session.current_group = modified_group
    }
    ToastAndroid.show ('Grupo modificado correctamente!', ToastAndroid.SHORT);
    navigate('Groups')
  } catch (error) {
    console.log('UPDATE_GROUP, ERROR:', error);
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
    console.log('GET_GROUPS, ERROR:', error);
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
    const {group} = yield call(getGroup, id, { skipLoading })
    yield put({
      type: 'groups/SET_STATE',
      payload: {
        current_group: group,
      },
    })
  } catch (error) {
    console.log('GET_GROUP, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
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
    console.log('GET_GROUP_MEMBERS, ERROR:', error);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
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
    console.log('GET_GROUP_CANDIDATES, ERROR:', error);
    ToastAndroid.show ('Error en envío de solicitud de unión al grupo', ToastAndroid.SHORT);
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
    console.log('SEND_GROUP_REQUEST, ERROR:', error);
    ToastAndroid.show ('Error en envío de solicitud de unión al grupo', ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* INCREASE_PRIVILEGES({ payload: { id, userID, index, skipLoading } }) {
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
        current_group_member: {...relation, index}
      },
    })
    yield put({
      type: 'groups/REPLACE_ARRAY_ELEMENT',
      payload: {
        newElement: relation,
        arrayName: 'current_group_members',
        index
      },
    })
    ToastAndroid.show ('Incremento de privilegios!', ToastAndroid.SHORT);
  } catch (error) {
    console.log('ACCEPT_GROUP_REQUEST, ERROR:', error);
    ToastAndroid.show ('Error en incrementación de privilegios', ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* REDUCE_PRIVILEGES({ payload: { id, userID, index, skipLoading } }) {
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
        current_group_member: {...relation, index}
      },
    })
    yield put({
      type: 'groups/REPLACE_ARRAY_ELEMENT',
      payload: {
        newElement: relation,
        arrayName: 'current_group_members',
        index
      },
    })
    ToastAndroid.show ('Incremento de privilegios!', ToastAndroid.SHORT);
  } catch (error) {
    console.log('REDUCE_PRIVILEGES, ERROR:', error);
    ToastAndroid.show ('Error en incrementación de privilegios', ToastAndroid.SHORT);
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
    console.log('ADD_GROUP_MEMBER, ERROR:', error);
    ToastAndroid.show ('Error en añadición de nuevo miembro del grupo', ToastAndroid.SHORT);
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
    console.log('ACCEPT_GROUP_REQUEST, ERROR:', error);
    ToastAndroid.show ('Error en aceptación de solicitud de unión al grupo', ToastAndroid.SHORT);
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
    console.log('REJECT_GROUP_REQUEST, ERROR:', error);
    
    ToastAndroid.show ('Error en rechazo de solicitud de unión al grupo', ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_GROUP_MEMBER({ payload: { id, index, userID, goBack, skipLoading } }) {
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
        index,
        arrayName: 'current_group_members'
      },
    })
    ToastAndroid.show ('Miembro eliminado del grupo!', ToastAndroid.SHORT);
    goBack();
  } catch (error) {
    console.log('DELETE_GROUP_MEMBER, ERROR:', error);
    ToastAndroid.show ('Error en eliminación de miemrbo del grupo', ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
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
    console.log('DELETE_GROUP_MEMBER, ERROR:', error);
    ToastAndroid.show ('Error dejando el grupo', ToastAndroid.SHORT);
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
    takeLatest(actions.DELETE_GROUP_MEMBER, DELETE_GROUP_MEMBER),
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
