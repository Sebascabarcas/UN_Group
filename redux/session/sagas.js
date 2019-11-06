import {all, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {ToastAndroid} from 'react-native';
import {
  login,
  currentAccount,
  logout,
  register,
  updateUser,
  currentSession,
} from '../../services/Session';
import jwt_decode from 'jwt-decode';
import Storage from '../../services/Storage';
import actions from './actions';
import fromJsonToFormData from '../../services/helpers';
// import { errorMessage } from '../../services/helpers'

export function* LOGIN({payload}) {
  const {auth, storeSession, navigate, skipLoading} = payload;
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    let {token, groups, relations} = yield call (login, auth, {skipLoading});
    console.log (token);
    console.log (groups);
    // const {secret, tokenable_id: user_id, tokenable_type: role} = success
    let {user, user: {isSuperAdmin, userGroupRelations}} = jwt_decode (token);
    console.log('token Decoded:', jwt_decode (token));

    // console.log(secret,
    //   user_id,
    //   role);
    // yield put({
    //   type: 'session/SET_STATE',
    //   payload: {
    //     secret,
    //     user_id,
    //     role
    //   },
    // })
    // console.log(storeSession);
    let current_group = null
    if (relations) {
      relations = relations.map (
        groupRelation => groupRelation.group
      );
      current_group = relations[0];
    }
    if (groups) current_group = groups[0];
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_user: user,
        isSuperAdmin: isSuperAdmin,
        myGroups: isSuperAdmin ?  groups : userGroupRelations,
        current_group
      }
    });
    yield call (
      Storage.set,
      'Session',
      {
        secret: token,
        user,
        groups: isSuperAdmin ? groups : userGroupRelations ,
        current_group
      },
      () => navigate ('Home')
    );
    ToastAndroid.show ('Bienvenido a la aplicación!', ToastAndroid.SHORT);
    console.log ('guardado');
  } catch (error) {
    console.log (error);
    ToastAndroid.show ('Usuario o contraseña invalidos', ToastAndroid.SHORT);
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* REGISTER({payload}) {
  const {user, navigate} = payload;
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    yield call (register, user);
    ToastAndroid.show (
      'Usuario registrado, porfavor ingrese con su identificación y contraseña',
      ToastAndroid.SHORT
    );
    navigate ('SignIn');
  } catch (error) {
    console.log (error);
    ToastAndroid.show (
      'Error en creación de usuario, verifique los campos',
      ToastAndroid.SHORT
    );
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* UPDATE_PROFILE({payload}) {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    const current_session = yield call (currentSession);
    var {user, skipLoading, navigate} = payload;
    user = fromJsonToFormData (user);
    // user.password = "123456" //Por motivos de pruebas
    const {user: user_edited} = yield call (updateUser, user, {skipLoading});
    // console.log('User edited:', user_edited);
    
    current_session.user = {...current_session.user, ...user_edited}
    yield call (
      Storage.set,
      'Session',
      current_session,
    );
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_user: user_edited,
      },
    });
    ToastAndroid.show ('Usuario actualizado!', ToastAndroid.SHORT);
    navigate ('MyProfile');
  } catch (error) {
    console.log (error);
    ToastAndroid.show ('Error actualizando usuario', ToastAndroid.SHORT);
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* LOGOUT({payload: {skipLoading, navigate}}) {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        loading: true,
      },
    });
    // yield call(logout, { skipLoading })
    yield call (Storage.delete, 'Session', () => navigate ('Auth'));
  } catch (error) {
    ToastAndroid.show ('Error cerrando sesión', ToastAndroid.SHORT);
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* CHANGE_CURRENT_GROUP({payload: {group, goBack}}) {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  const current_session = yield call (currentSession);
  if (current_session) {
    current_session.current_group = group;
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_group: group,
      },
    });
    yield call (
      Storage.set,
      'Session',
      current_session,
      () => {
        goBack ();
      }
    );
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* LOAD_CURRENT_ACCOUNT () {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  const current_session = yield call (currentSession);
  // console.log('El usuario', current_user);

  if (current_session) {
    let {user: current_user, user: {isSuperAdmin}, groups, current_group} = current_session;
    const payload = {
      current_user,
      isSuperAdmin,
      myGroups: groups,
    };
    if (current_group) payload.current_group = current_group;
    yield put ({
      type: 'session/SET_STATE',
      payload,
    });
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export default function* rootSaga () {
  yield all ([
    takeLatest (actions.CHANGE_CURRENT_GROUP, CHANGE_CURRENT_GROUP),
    takeLatest (actions.LOGIN, LOGIN),
    takeLatest (actions.LOGOUT, LOGOUT),
    takeLatest (actions.REGISTER, REGISTER),
    takeLatest (actions.UPDATE_PROFILE, UPDATE_PROFILE),
    // takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    // takeEvery(actions.UNAUTH_USER, UNAUTH_USER),
    LOAD_CURRENT_ACCOUNT (),
  ]);
}
