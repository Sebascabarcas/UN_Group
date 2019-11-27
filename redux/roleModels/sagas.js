import { put, call, all, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import {fromJsonToFormData, showErrorModal, showResultModal} from '../../services/helpers';
import { createPost, updatePost, deletePost, getRoleModelsPosts, getRoleModels, getRoleModelPosts } from '../../services/RoleModels';

export function* CREATE_POST({ payload: { groupId, user, post, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    post = fromJsonToFormData(post)
    const {post: new_post} = yield call(createPost, groupId, post, {skipLoading});
    yield put({
      type: 'roleModels/ADD_ARRAY_ELEMENT',
      payload: {
        arrayName: 'posts',
        newElement: {...new_post, user},
        first: true
      }
    })
    navigate('RoleModels')
    yield showResultModal ({
      resultText: '¡Publicación creada correctamente!',
    });
  } catch (error) {
    yield showErrorModal (error);
  }
}

export function* UPDATE_POST({ payload: { postId, post, navigate, goBack, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    goBack();
    yield showResultModal ({
      resultText: '¡Publicación editada correctamente!',
    });
  } catch (error) {
    yield showErrorModal (error);
  }
}

export function* DELETE_POST({ payload: {postId, goBack, navigate, skipLoading } }) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
    },
  })
  
  try {
    yield call(deletePost, postId, {skipLoading});
    yield put({
      type: 'roleModels/DELETE_ARRAY_ELEMENT',
      payload: {
        arrayName: 'current_role_model_posts',
        id: postId
      },
    })
    navigate('RoleModels');
    yield showResultModal ({
      resultText: '¡Publicación eliminado correctamente!',
    });
  } catch (error) {
    yield showErrorModal (error);
  }
}

export function* GET_ROLE_MODELS({payload: {groupId, skipLoading, concat}}) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showErrorModal (error);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_ROLE_MODELS_POSTS({payload: {groupId, skipLoading, concat}}) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showErrorModal (error);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
    },
  })
}

export function* GET_ROLE_MODEL_POSTS({payload: {groupId, userId, skipLoading, concat}}) {
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: true,
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
    yield showErrorModal (error);
  }
  yield put({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
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
  ])
}
