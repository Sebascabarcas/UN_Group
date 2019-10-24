import { all, takeEvery, takeLatest, put, call } from 'redux-saga/effects'
import {ToastAndroid} from 'react-native'
import { login, currentAccount, logout, register, updateUser } from '../../services/Session';
import jwt_decode from 'jwt-decode';
import Storage from '../../services/Storage';
import actions from './actions'
// import { errorMessage } from '../../services/helpers'

export function* LOGIN({ payload }) {
  const { auth, storeSession, navigate, skipLoading } = payload
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const success = yield call(
      login,
      auth,
      { skipLoading },
    )
    console.log(success)
    // const {secret, tokenable_id: user_id, tokenable_type: role} = success
    const {data: token} = success
    const {user} = jwt_decode(token);
    console.log(user);
    
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
    yield call (Storage.set, 'Session', {
      secret: token,
      user
    }, ()  => navigate('Home'))
    yield put({
      type: 'session/SET_STATE',
      payload: {
        isSuperAdmin: user.isSuperAdmin
      },
    })
    ToastAndroid.show ('Bienvenido a la aplicación!', ToastAndroid.SHORT);
    console.log('guardado');
  } catch (error) {
    console.log(error);
    ToastAndroid.show ('Usuario o contraseña invalidos', ToastAndroid.SHORT);
  }
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* REGISTER({ payload }) {
  const { user, navigate } = payload
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield call(register, user)
    ToastAndroid.show (
      'Usuario registrado, porfavor ingrese con su identificación y contraseña',
      ToastAndroid.SHORT
    );
    navigate('SignIn')
  } catch (error) {
    console.log(error);
    ToastAndroid.show (
      'Error en creación de usuario, verifique los campos',
      ToastAndroid.SHORT
    );
  }
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  })
}


export function* UPDATE_PROFILE({payload}) {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {user, skipLoading, navigate } = payload
    console.log(user);
    user.password = "123456" //Por motivos de pruebas
    // console.log(_user);
    
    const success = yield call(
      updateUser,
      user,
      user.id,
      { skipLoading },
    )
    console.log(success)
    const user_edited = success
    
    yield put({
      type: 'session/SET_STATE',
      payload: {
        current_user: user_edited
      },
    })
    
    ToastAndroid.show ('Usuario actualizado!', ToastAndroid.SHORT);
    navigate('MyProfile')
    console.log('guardado');
  } catch (error) {
    console.log(error);
    ToastAndroid.show ('Error actualizando usuario', ToastAndroid.SHORT);
  }
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT({ payload: { skipLoading, navigate } }) {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    yield put({
      type: 'session/SET_STATE',
      payload: {
        loading: true,
      },
    })
    // yield call(logout, { skipLoading })
    yield call (Storage.delete, 'Session', ()  => navigate('Auth'))
  } catch (error) {
    ToastAndroid.show ('Error cerrando sesión', ToastAndroid.SHORT);
  }
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  })
}


export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(currentAccount)

  if (response) {
    const { id, email, photoURL: avatar, role, name, phone, isSuperAdmin } = response
    yield put({
      type: 'session/SET_STATE',
      payload: {
        id,
        name,
        email,
        phone,
        avatar,
        role,
        isSuperAdmin,
        authorized: true,
      },
    })
    yield put({
      type: 'menu/CHANGE_MENU',
      payload: {
        role,
      },
    })
  }
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  })
}


export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN, LOGIN),
    takeLatest(actions.REGISTER, REGISTER),
    takeLatest(actions.UPDATE_PROFILE, UPDATE_PROFILE),
    takeLatest(actions.LOGOUT, LOGOUT),
    // takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    // takeEvery(actions.UNAUTH_USER, UNAUTH_USER),
    LOAD_CURRENT_ACCOUNT(),
  ])
}
