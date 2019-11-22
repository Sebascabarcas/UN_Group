import Requests from './Requests'

export async function getRoleModels(groupId, { skipLoading } = {}) {
    return Requests.get(`groups/${groupId}/roleModels`, {skipLoading}).then(posts => posts.data)
}

export async function getRoleModelsPosts(groupId, { skipLoading } = {}) {
    return Requests.get(`groups/${groupId}/posts`, {skipLoading}).then(posts => posts.data)
}

export async function getRoleModelPosts(groupId, userId, { skipLoading } = {}) {
    return Requests.get(`users/${userId}/postsAt/${groupId}/`, {skipLoading}).then(posts => posts.data)
}

export async function createPost(groupId, post, { skipLoading } = {}) {
    return Requests.post(`groups/${groupId}`, post, {skipLoading}).then(post => post.data)
}

export async function getPost(postId, { skipLoading } = {}) {
    return Requests.get(`posts/${postId}`, {skipLoading}).then(post => post.data)
}

export async function updatePost(postId, post, { skipLoading } = {}) {
    return Requests.put(`posts/${postId}`, post, {skipLoading}).then(post => post.data)
}

export async function deletePost(postId, { skipLoading } = {}) {
    return Requests.delete(`posts/${postId}`, {skipLoading}).then(post => post.data)
}

export async function toggleisRolemodel(userId, { skipLoading } = {}) {
    return Requests.put(`users/${userId}/toggleisRolemodel`, {}, {skipLoading}).then(isMentor => isMentor.data)
}