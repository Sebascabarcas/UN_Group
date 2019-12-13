import {all, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {
  login,
  register,
  updateUser,
  currentSession,
  getUserInvitations,
  getUserEvents,
  acceptEventInvitation,
  searchUsers,
  deleteAccount,
  deleteUser,
  showUser,
} from '../../services/Session';
import Storage from '../../services/Storage';
import jwt_decode from 'jwt-decode';
import actions from './actions';
import {
  fromJsonToFormData,
  showErrorModal,
  showResultModal,
} from '../../services/helpers';
import {toggleisRolemodel} from '../../services/RoleModels';
import {toggleIsMentor} from '../../services/Mentors';
import { getGroups } from '../../services/Groups';
// import { errorMessage } from '../../services/helpers'

export function* LOGIN({payload}) {
  const {auth, navigate, skipLoading} = payload;
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    let {token, groups, relations} = yield call (login, auth, {skipLoading});
    let {
      user,
      user: {isSuperAdmin, userGroupRelations, isMentor, isRolemodel},
    } = jwt_decode (token);
    console.log ('token Decoded:', jwt_decode (token));
    let current_group = null;
    if (!isSuperAdmin && relations.length > 0) {
      relations[0].group.isAdmin = relations[0].isAdmin;
      relations = relations.map (groupRelation => groupRelation.group);
      current_group = relations[0];
    }
    if (groups) {
      current_group = groups[0];
    }
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_user: user,
        isAdmin: current_group ? current_group.isAdmin : false,
        isRolemodel,
        isMentor,
        isSuperAdmin,
        myGroups: isSuperAdmin ? groups : userGroupRelations,
        current_group,
      },
    });
    user.isAdmin = current_group ? current_group.isAdmin : false;
    yield showResultModal ({
      resultText: '¡Bienvenido a UNGROUP!',
      error: false
    });
    yield call (
      Storage.set,
      'Session',
      {
        secret: token,
        user,
        groups: isSuperAdmin ? groups : userGroupRelations,
        current_group,
      },
      () => navigate ('Home')
    );
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* BE_ROLE_MODEL({payload: {userId, navigate, goBack}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    yield call (toggleisRolemodel, userId);
    const current_session = yield call (currentSession);
    current_session.user.isRolemodel = true;
    yield call (Storage.set, 'Session', current_session);
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        isRolemodel: true,
      },
    });
    yield showResultModal ({
      resultText: '¡Te has convertido en un Role Model!',
      error: false
    });
    navigate ('Home');
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* BE_MENTOR({payload: {userId, navigate, goBack}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    yield call (toggleIsMentor, userId);
    const current_session = yield call (currentSession);
    current_session.user.isMentor = true;
    yield call (Storage.set, 'Session', current_session);
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        isMentor: true,
      },
    });
    yield showResultModal ({
      resultText: '¡Te has convertido en un Mentor!',
      error: false
    });
    navigate ('Home');
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* REGISTER({payload}) {
  const {user, navigate} = payload;
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    yield call (register, user);
    yield showResultModal ({
      resultText: 'Usuario registrado, porfavor ingrese a su correo y haga la confirmación de su cuenta',
      error: false
    });
    navigate ('SignIn');
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* UPDATE_PROFILE({payload}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    const current_session = yield call (currentSession);
    var {user: {id: userId}, user, skipLoading, navigate} = payload;
    user = fromJsonToFormData (user);
    const {user: user_edited} = yield call (updateUser, userId, user, {
      skipLoading,
    });
    current_session.user = {...current_session.user, ...user_edited};
    yield call (Storage.set, 'Session', current_session);
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_user: user_edited,
      },
    });
    yield showResultModal ({
      resultText: '¡Usuario actualizado!',
      error: false
    });
    navigate ('MyProfile');
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* DELETE_ACCOUNT({payload: {skipLoading, navigate}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  yield put ({
    type: 'RESET_APP',
  });
  try {
    yield call (deleteAccount, {skipLoading});
    yield call (Storage.delete, 'Session', () => navigate ('Auth'));
    yield showResultModal ({
      resultText: '¡Has eliminado tu cuenta!',
      error: false
    });
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* DELETE_USER({payload: {userId, skipLoading, navigate}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showResultModal ({
      resultText: '¡Usuario eliminado!',
      error: false
    });
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
}

export function* LOGOUT({payload: {skipLoading, navigate}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  yield put ({
    type: 'RESET_APP',
  });
  try {
    yield call (Storage.delete, 'Session', () => navigate ('Auth'));
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* CHANGE_CURRENT_GROUP({payload: {group, goBack}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  const current_session = yield call (currentSession);
  if (current_session) {
    current_session.current_group = group;
    current_session.user.isAdmin = group.isAdmin;
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_group: group,
      },
    });
    yield call (Storage.set, 'Session', current_session, () => {
      goBack ();
    });
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* GET_USER_INVITATIONS({payload: {id, skipLoading}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    const {invitations} = yield call (getUserInvitations, id, {skipLoading});
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        myInvitations: invitations,
      },
    });
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
    // errorMessage(error.response, { title: 'Fetch de localidad fallida!' })
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* GET_USER_EVENTS({payload: {id, skipLoading}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    const {atendees} = yield call (getUserEvents, id, {skipLoading});
    yield put ({
      type: 'events/SET_STATE',
      payload: {
        events,
      },
    });
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* SEARCH_USERS({payload: {querySearch, skipLoading}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    const {users} = yield call (searchUsers, querySearch, {skipLoading});
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        users_searched: users,
      },
    });
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* ACCEPT_EVENT_INVITATION({
  payload: {id, eventId, navigate, skipLoading},
}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    const {atendee: {event}} = yield call (acceptEventInvitation, id, eventId, {
      skipLoading,
    });
    yield put ({
      type: 'events/ADD_ARRAY_ELEMENT',
      payload: {
        newElement: event,
        arrayName: 'events',
      },
    });
    navigate ('Home');
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* REJECT_EVENT_INVITATION({
  payload: {id, eventId, skipLoading},
}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  });
  try {
    const success = yield call (rejectUserInvitation, id, eventId, {
      skipLoading,
    });
    yield put ({
      type: 'session/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'myInvitations',
        id: success.id,
      },
    });
    navigate ('MyInvitations');
  } catch (error) {
    yield showResultModal ({resultText: error, resultAnimation: 'failure', error: true});
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
}

export function* LOAD_CURRENT_ACCOUNT({payload: {navigate, current_session}}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    }
  });
  try {
    console.log('LOAD_CURRENT_ACCOUNT BEGINS');
    
    let current_group = null;
    let {user: {id: userId, userGroupRelations}, secret} = current_session;
    let {user, user: {isSuperAdmin, isRolemodel, isMentor}} = yield call (
      showUser,
      userId
    );
    if (isSuperAdmin) {
      var {groups} = yield call (getGroups);
      current_group = groups ? groups[0] || null : null;
    } else {
      if (userGroupRelations.length > 0) {
        userGroupRelations[0].group.isAdmin = userGroupRelations[0].isAdmin;
        userGroupRelations = userGroupRelations.map (
          groupRelation => groupRelation.group
        );
        current_group = userGroupRelations[0];
      }
    }
    user.isAdmin = current_group ? current_group.isAdmin : false;
    yield call (Storage.set, 'Session', {
      secret,
      user,
      groups: isSuperAdmin ? groups : userGroupRelations,
      current_group,
    });
    yield put ({
      type: 'session/SET_STATE',
      payload: {
        current_user: user,
        current_group,
        myGroups: isSuperAdmin ? groups : userGroupRelations,
        isSuperAdmin,
        isRolemodel,
        isMentor,
        isAdmin: current_group ? current_group.isAdmin : false,
      },
    });
    yield put ({
      type: 'groups/SET_STATE',
      payload: {current_group},
    });
    navigate ('App');
  } catch (error) {
    yield showErrorModal (error, navigate);
  }
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  });
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
    takeLatest (actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    // LOAD_CURRENT_ACCOUNT (),
  ]);
}
