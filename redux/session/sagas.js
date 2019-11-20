import {all, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {ToastAndroid} from 'react-native';
import {
  login,
  currentAccount,
  logout,
  register,
  updateUser,
  currentSession,
  getUserInvitations,
  getUserEvents,
  acceptEventInvitation,
  searchUsers,
  deleteAccount,
  deleteUser,
} from '../../services/Session';
import Storage from '../../services/Storage';
import jwt_decode from 'jwt-decode';
import actions from './actions';
import {fromJsonToFormData, errorMessage} from '../../services/helpers';
import { toggleIsRoleModel } from '../../services/RoleModels';
import { toggleIsMentor } from '../../services/Mentors';
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
    let {user, user: {isSuperAdmin, userGroupRelations, isRoleModel}} = jwt_decode (token);
    console.log('token Decoded:', jwt_decode (token));
    let current_group = null
    if (!isSuperAdmin && relations.length > 0) {
      relations[0].group.isAdmin = relations[0].isAdmin;
      relations = relations.map (
        groupRelation => groupRelation.group
      );
      current_group = relations[0];
      // current_group.isAdmin = relations[0].isAdmin;
    }
    if (groups) {
      current_group = groups[0];
    }
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_user: user,
        isAdmin: current_group ? current_group.isAdmin : false,
        isRoleModel,
        isSuperAdmin,
        myGroups: isSuperAdmin ?  groups : userGroupRelations,
        current_group
      }
    });
    user.isAdmin = current_group ? current_group.isAdmin : false
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
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* BE_ROLE_MODEL({payload: {userId, navigate, goBack}}) {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    yield call (toggleIsRoleModel, userId);
    const current_session = yield call (currentSession);
    current_session.user.isRoleModel = true
    yield call (
      Storage.set,
      'Session',
      current_session,
    );
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        isRoleModel: true
      },
    });
    ToastAndroid.show (
      '¡Te has convertido en un Role Model!',
      ToastAndroid.SHORT
    );
    navigate ('Home');
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* BE_MENTOR({payload: {userId, navigate, goBack}}) {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    yield call (toggleIsMentor, userId);
    const current_session = yield call (currentSession);
    current_session.user.isMentor = true
    yield call (
      Storage.set,
      'Session',
      current_session,
    );
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        isMentor: true
      },
    });
    ToastAndroid.show (
      '¡Te has convertido en un Mentor!',
      ToastAndroid.SHORT
    );
    navigate ('Home');
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
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
      'Usuario registrado, porfavor ingrese a su correo y haga la confirmación de su cuenta',
      ToastAndroid.SHORT
    );
    navigate ('SignIn');
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
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
    var {user: {id: userId}, user, skipLoading, navigate} = payload;
    user = fromJsonToFormData (user);
    // user.password = "123456" //Por motivos de pruebas
    const {user: user_edited} = yield call (updateUser, userId, user, {skipLoading});
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
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    },
  });
}

export function* DELETE_ACCOUNT({payload: {skipLoading, navigate}}) {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    yield call (deleteAccount, {skipLoading});
    // yield call(logout, { skipLoading })
    yield call (Storage.delete, 'Session', () => navigate ('Auth'));
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put ({
    type: 'RESET_APP',
  });
}

export function* DELETE_USER({payload: {userId, skipLoading, navigate}}) {
  yield put ({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  });
  try {
    yield call (deleteUser, userId, {skipLoading});
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        users_searched: [],
      },
    });
    ToastAndroid.show ('¡Usuario eliminado!', ToastAndroid.SHORT);
    // yield call(logout, { skipLoading })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
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
    // yield call(logout, { skipLoading })
    yield call (Storage.delete, 'Session', () => navigate ('Auth'));
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put ({
    type: 'RESET_APP',
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
    current_session.user.isAdmin = group.isAdmin
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

export function* GET_USER_INVITATIONS({ payload: { id, skipLoading } }) {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {invitations} = yield call(getUserInvitations, id, { skipLoading })
    yield put({
      type: 'session/SET_STATE',
      payload: {
        myInvitations: invitations,
      },
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_USER_EVENTS({ payload: { id, skipLoading } }) {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    }
  })
  try {
    const {atendees} = yield call(getUserEvents, id, { skipLoading })
    yield put({
      type: 'events/SET_STATE',
      payload: {
        events
      }
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    }
  })
}

export function* SEARCH_USERS({ payload: { querySearch, skipLoading } }) {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    }
  })
  try {
    const {users} = yield call(searchUsers, querySearch, { skipLoading })
    
    yield put({
      type: 'session/SET_STATE',
      payload: {
        users_searched: users
      }
    })
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: false,
    }
  })
}

export function* ACCEPT_EVENT_INVITATION({ payload: { id, eventId, navigate, skipLoading } }) {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {atendee} = yield call(acceptEventInvitation, id, eventId, { skipLoading })
    yield put({
      type: 'events/ADD_ARRAY_ELEMENT',
      payload: {
        newElement: atendee,
        arrayName: 'events'
      },
    })
    navigate('Home')
    /* yield put({
      type: 'session/SET_STATE',
      payload: {
        myInvitations: invitations,
      },
    }) */
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* REJECT_EVENT_INVITATION({ payload: { id, eventId, skipLoading } }) {
  yield put({
    type: 'session/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const success = yield call(rejectUserInvitation, id, eventId, { skipLoading })
    console.log(success);
    
    /* yield put({
      type: 'session/SET_STATE',
      payload: {
        myInvitations: invitations,
      },
    }) */
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put({
    type: 'events/SET_STATE',
    payload: {
      loading: false,
    },
  })
}


export default function* rootSaga () {
  yield all ([
    takeLatest (actions.CHANGE_CURRENT_GROUP, CHANGE_CURRENT_GROUP),
    takeLatest (actions.BE_ROLE_MODEL, BE_ROLE_MODEL),
    takeLatest (actions.BE_MENTOR, BE_MENTOR),
    takeLatest (actions.LOGIN, LOGIN),
    takeLatest (actions.LOGOUT, LOGOUT),
    takeLatest (actions.DELETE_ACCOUNT, DELETE_ACCOUNT),
    takeLatest (actions.DELETE_USER, DELETE_USER),
    takeLatest (actions.REGISTER, REGISTER),
    takeLatest (actions.UPDATE_PROFILE, UPDATE_PROFILE),
    takeLatest (actions.SEARCH_USERS, SEARCH_USERS),
    takeLatest (actions.GET_USER_INVITATIONS, GET_USER_INVITATIONS),
    takeLatest (actions.GET_USER_EVENTS, GET_USER_EVENTS),
    takeLatest (actions.ACCEPT_EVENT_INVITATION, ACCEPT_EVENT_INVITATION),
    // takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    // takeEvery(actions.UNAUTH_USER, UNAUTH_USER),
    LOAD_CURRENT_ACCOUNT (),
  ]);
}
