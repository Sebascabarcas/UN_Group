import { ToastAndroid } from 'react-native';
import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import {fromJsonToFormData, errorMessage} from '../../services/helpers';
import { createPost, updatePost, deletePost, getRoleModelsPosts, getRoleModels, getRoleModelPosts } from '../../services/RoleModels';
// import moment from 'moment-timezone'
// import 'moment/locale/es'  // without this line it didn't work
// moment.locale('es')
// import { errorMessage } from '../../services/helpers'


export function* CREATE_POST({ payload: { groupId, post, navigate, skipLoading } }) {
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    // console.log(event.date);
    post = fromJsonToFormData(post)
    // console.log(event);
    const {post: new_post} = yield call(createPost, groupId, post, {skipLoading});
    yield put({
      type: 'roleModels/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'posts',
        newElement: new_post
      }
    })
    ToastAndroid.show ('!Publicación creada correctamente!', ToastAndroid.SHORT);
    navigate('RoleModels')
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* UPDATE_POST({ payload: { postId, post, navigate, goBack, skipLoading } }) {
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    post = fromJsonToFormData(post)
    const {post: modified_post} = yield call(updatePost, postId, post, {skipLoading});
    yield put({
      type: 'roleModels/REPLACE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_role_model_posts',
        id: post.id,
        newElement: modified_post
      }
    })
    yield put({
      type: 'roleModels/REPLACE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'posts',
        id: post.id,
        newElement: modified_post
      }
    })
    yield put({
      type: 'roleModels/SET_STATE',
      payload: {
        current_post: {...post, ...modified_post}
      }
    })
    ToastAndroid.show ('Publicación editada correctamente!', ToastAndroid.SHORT);
    goBack();
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_POST({ payload: {postId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: true,
    },
  })
  
  try {
    yield call(deletePost, postId, {skipLoading});
    // console.log();
    yield put({
      type: 'roleModels/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_role_model_posts',
        id: postId
      },
    })
    ToastAndroid.show ('Publicación eliminado correctamente!', ToastAndroid.SHORT);
    // goBack()
    navigate('RoleModels');
    // console.log(success);
  } catch (error) {
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_ROLE_MODELS({payload: {groupId, skipLoading, concat}}) {
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {relations} = yield call(getRoleModels, groupId, { skipLoading })
    yield put({
      type: `roleModels/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        role_models: relations
      },
    })
  } catch (error) {
    console.log(error);
    
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_ROLE_MODELS_POSTS({payload: {groupId, skipLoading, concat}}) {
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {posts} = yield call(getRoleModelsPosts, groupId, { skipLoading })
    yield put({
      type: `roleModels/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        posts
      },
    })
  } catch (error) {
    console.log(error);
    
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_ROLE_MODEL_POSTS({payload: {groupId, userId, skipLoading, concat}}) {
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: true,
    },
  })
  try {
    const {posts} = yield call(getRoleModelPosts, groupId, userId, { skipLoading })
    yield put({
      type: `roleModels/${concat ? 'CONCAT_EVENTS' : 'SET_STATE' }`,
      payload: {
        current_role_model_posts: posts
      },
    })
  } catch (error) {
    console.log(error);
    
    ToastAndroid.show (errorMessage(error), ToastAndroid.SHORT);
  }
  yield put({
    type: 'roleModels/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.CREATE_POST, CREATE_POST),
    takeLatest(actions.UPDATE_POST, UPDATE_POST),
    takeLatest(actions.DELETE_POST, DELETE_POST),
    takeLatest(actions.GET_ROLE_MODELS, GET_ROLE_MODELS),
    takeLatest(actions.GET_ROLE_MODEL_POSTS, GET_ROLE_MODEL_POSTS),
    takeLatest(actions.GET_ROLE_MODELS_POSTS, GET_ROLE_MODELS_POSTS),
    // takeEvery(actions.DELETE_LOCATION, DELETE_LOCATION),
    // takeEvery(actions.GET_LOCATIONS, GET_LOCATIONS),
    // takeEvery(actions.GET_LOCATION, GET_LOCATION),
    // takeEvery(actions.UPDATE_LOCATION, UPDATE_LOCATION),
    // GET_INFO_locations(), // run once on app load to check user auth
  ])
}
