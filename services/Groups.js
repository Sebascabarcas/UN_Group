
export async function getGroups({ skipLoading } = {}) {
    return Requests.get(`groups`).then(groups => groups.data)
}

export async function getGroup(id, { skipLoading } = {}) {
    return Requests.get(`groups/${id}]`).then(group => group.data)
}

export async function createGroup(newGroup, { skipLoading } = {}) {
    return Requests.post(`groups`, newGroup, { skipLoading }).then(group => group.data)
}

export async function sendGroupMemberRequest(groupName, { skipLoading } = {}) {
    return Requests.post(`groups/${groupName}/join`, { skipLoading }).then(group => group)
}

export async function addMember(groupName, newMember, { skipLoading } = {}) {
    return Requests.put(`groups/${groupName}/addMember/${newMember}`, { skipLoading }).then(group => group)
}

export async function acceptMember(groupName, newCandidate, { skipLoading } = {}) {
    return Requests.put(`groups/${groupName}/acceptCandidate/${newCandidate}`, { skipLoading }).then(group => group)
}

export async function increasePrivileges(groupName, member, { skipLoading } = {}) {
    return Requests.put(`groups/${groupName}/increasePrivileges/${member}`, { skipLoading }).then(group => group)
}

export async function reducePrivileges(groupName, member, { skipLoading } = {}) {
    return Requests.put(`groups/${groupName}/reducePrivileges/${member}`, { skipLoading }).then(group => group)
}

export async function addAdminMember(groupName, newAdmin, { skipLoading } = {}) {
    return Requests.post(`groups/${groupName}/addAsAdmin/${newAdmin}`, { skipLoading }).then(group => group)
}

export async function leaveGroup(groupName, member, { skipLoading } = {}) {
    return Requests.delete(`groups/${groupName}/kick/${member}`, { skipLoading }).then(group => group)
}

export async function kickGroupMember(groupName, { skipLoading } = {}) {
    return Requests.delete(`groups/${groupName}/leave`, { skipLoading }).then(group => group)
}

export async function getGroupMembers(groupName, { skipLoading } = {}) {
    return Requests.get(`groups/${groupName}/members`, { skipLoading }).then(group => group.data)
}

export async function getGroupCandidates(groupName, { skipLoading } = {}) {
    return Requests.get(`groups/${groupName}/candidates`, { skipLoading }).then(group => group.data)
}
