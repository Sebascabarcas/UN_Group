import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  createGroup, getGroups, getGroup, getGroupMembers, sendGroupMemberRequest, getGroupCandidates, acceptMember, kickGroupMember, increasePrivileges, reducePrivileges
} from '../../services/Groups'
import {ToastAndroid} from 'react-native'
import actions from './actions'
import fromJsonToFormData from '../../services/helpers';
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
    console.log(success);
    yield put({
      type: 'groups/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'groups',
        newElement: new_group
      },
    })
    ToastAndroid.show ('Grupo creado correctamente!', ToastAndroid.SHORT);
    navigate('Groups')
    console.log(success);
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
      type: `groups/${concat ? 'CONCAT_GROUPS' : 'SET_STATE' }`,
      payload: {
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

export function* INCREASE_PRIVILEGES({ payload: { id, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(increasePrivileges, id, userID, { skipLoading })
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

export function* REDUCE_PRIVILEGES({ payload: { id, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(reducePrivileges, id, userID, { skipLoading })
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

export function* ACCEPT_GROUP_REQUEST({ payload: { id, index, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(acceptMember, id, userID, { skipLoading })
    yield put({
      type: 'groups/DELETE_ARRAY_ELEMENT',
      payload: {
        index,
        arrayName: 'current_group_requests'
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

export function* DELETE_GROUP_MEMBER({ payload: { id, index, userID, skipLoading } }) {
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

export default function* rootSaga() {
  yield all([
    takeLatest(actions.ACCEPT_GROUP_REQUEST, ACCEPT_GROUP_REQUEST),
    takeLatest(actions.CREATE_GROUP, CREATE_GROUP),
    takeLatest(actions.DELETE_GROUP_MEMBER, DELETE_GROUP_MEMBER),
    takeLatest(actions.GET_GROUPS, GET_GROUPS),
    takeLatest(actions.GET_GROUP, GET_GROUP),
    takeLatest(actions.GET_GROUP_MEMBERS, GET_GROUP_MEMBERS),
    takeLatest(actions.GET_GROUP_CANDIDATES, GET_GROUP_CANDIDATES),
    takeLatest(actions.INCREASE_PRIVILEGES, INCREASE_PRIVILEGES),
    takeLatest(actions.REDUCE_PRIVILEGES, REDUCE_PRIVILEGES),
    takeLatest(actions.REJECT_GROUP_REQUEST, REJECT_GROUP_REQUEST),
    takeLatest(actions.SEND_GROUP_REQUEST, SEND_GROUP_REQUEST),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
