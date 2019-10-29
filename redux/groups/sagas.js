import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  createGroup, getGroups, getGroup, getGroupMembers, sendGroupMemberRequest, getGroupCandidates, acceptMember
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
    
    const success = yield call(createGroup, group, {skipLoading});
    console.log(success);
    
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
    console.log(error);
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
    console.log(res);
  } catch (error) {
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

export function* ACCEPT_GROUP_REQUEST({ payload: { id, userID, skipLoading } }) {
  yield put({
    type: 'groups/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(acceptMember, id, userID, { skipLoading })
    ToastAndroid.show ('Solicitud de unión al grupo aceptada!', ToastAndroid.SHORT);
  } catch (error) {
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

export default function* rootSaga() {
  yield all([
    takeLatest(actions.CREATE_GROUP, CREATE_GROUP),
    takeLatest(actions.GET_GROUPS, GET_GROUPS),
    takeLatest(actions.GET_GROUP, GET_GROUP),
    takeLatest(actions.GET_GROUP_MEMBERS, GET_GROUP_MEMBERS),
    takeLatest(actions.SEND_GROUP_REQUEST, SEND_GROUP_REQUEST),
    takeLatest(actions.ACCEPT_GROUP_REQUEST, ACCEPT_GROUP_REQUEST),
    takeLatest(actions.GET_GROUP_CANDIDATES, GET_GROUP_CANDIDATES),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
