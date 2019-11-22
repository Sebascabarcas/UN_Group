import Requests from './Requests'
import Storage from './Storage';

export async function getGroupEvents(id, { skipLoading } = {}) {
    return Requests.get(`groups/${id}/events`).then(events => events.data)
}

export async function getGroups({ skipLoading } = {}) {
    return Requests.get(`groups`).then(groups => groups.data)
}

export async function getGroup(id, { skipLoading } = {}) {
    return Requests.get(`groups/${id}`).then(group => group.data)
}

export async function getUserTasks(userId, groupId, { skipLoading } = {}) {
    return Requests.get(`users/${userId}/tasksAt/${groupId}`).then(tasks => tasks.data)
}

export async function createGroup(newGroup, { skipLoading } = {}) {
    return Requests.post(`groups`, newGroup, { skipLoading}).then(group => group.data)
}

export async function updateGroup(id, newGroup, { skipLoading } = {}) {
    return Requests.put(`groups/${id}`, newGroup, { skipLoading}).then(group => group.data)
}

export async function deleteGroup(id, { skipLoading } = {}) {
    return Requests.delete(`groups/${id}`, { skipLoading }).then(group => group.data)
}

export async function sendGroupMemberRequest(id, { skipLoading } = {}) {
    return Requests.post(`groups/${id}/join`, { skipLoading }).then(group => group)
}

export async function addMember(id, userID, { skipLoading } = {}) {
    return Requests.post(`groups/${id}/addMember/${userID}`, { skipLoading }).then(group => group.data)
}

export async function acceptMember(id, userID, { skipLoading } = {}) {
    return Requests.put(`groups/${id}/acceptCandidate/${userID}`, { skipLoading }).then(group => group.data)
}

export async function rejectMember(id, userID, { skipLoading } = {}) {
    return Requests.put(`groups/${id}/rejectCandidate/${userID}`, { skipLoading }).then(group => group.data)
}

export async function increasePrivileges(id, userID, { skipLoading } = {}) {
    return Requests.put(`groups/${id}/increasePrivileges/${userID}`, { skipLoading }).then(group => group.data)
}

export async function reducePrivileges(id, userID, { skipLoading } = {}) {
    return Requests.put(`groups/${id}/reducePrivileges/${userID}`, { skipLoading }).then(group => group.data)
}

export async function addAdminMember(id, userID, { skipLoading } = {}) {
    return Requests.post(`groups/${id}/addAsAdmin/${userID}`, { skipLoading }).then(group => group.data)
}

export async function kickGroupMember(id, userID, { skipLoading } = {}) {
    return Requests.delete(`groups/${id}/kick/${userID}`, { skipLoading }).then(group => group.data)
}

export async function leaveGroup(id, { skipLoading } = {}) {
    return Requests.delete(`groups/${id}/leave`, { skipLoading }).then(group => group.data)
}

export async function getGroupMembers(id, { skipLoading } = {}) {
    return Requests.get(`groups/${id}/members`, { skipLoading }).then(group => group.data)
}

export async function getGroupCandidates(id, { skipLoading } = {}) {
    return Requests.get(`groups/${id}/candidates`, { skipLoading }).then(group => group.data)
}
