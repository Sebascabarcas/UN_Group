const GOOGLE_MAPS_APIKEY = 'AIzaSyCWPrODz1hIw-3g2gX94dTJTspvq768GOw';

export async function getGroups({ skipLoading } = {}) {
    return Requests.get(`groups`).then(groups => groups.data)
}

export async function getGroup(id, { skipLoading } = {}) {
    return Requests.get(`groups/id/${id}]`).then(group => group.data)
}

export async function createGroup(newGroup, { skipLoading } = {}) {
    return Requests.post(`groups`, newGroup, { skipLoading }).then(group => group.data)
}

export async function sendGroupMemberRequest(groupName, { skipLoading } = {}) {
    return Requests.post(`groups/join/${groupName}`, { skipLoading }).then(group => group)
}

export async function addMember(groupName, newMember, { skipLoading } = {}) {
    return Requests.put(`groups/add/${groupName}`, newMember, { skipLoading }).then(group => group)
}

export async function acceptMember(groupName, candidate, { skipLoading } = {}) {
    return Requests.put(`groups/accept/${groupName}`, candidate, { skipLoading }).then(group => group)
}

export async function increasePrivileges(groupName, member, { skipLoading } = {}) {
    return Requests.put(`groups/increasePrivileges/${groupName}`, member, { skipLoading }).then(group => group)
}

export async function reducePrivileges(groupName, member, { skipLoading } = {}) {
    return Requests.put(`groups/reducePrivileges/${groupName}`, member, { skipLoading }).then(group => group)
}

export async function addAdminMember(groupName, newAdmin, { skipLoading } = {}) {
    return Requests.post(`groups/addAsAdmin/${groupName}`, newAdmin, { skipLoading }).then(group => group)
}

export async function leaveGroup(groupName, { skipLoading } = {}) {
    return Requests.delete(`groups/kick/${groupName}`, { skipLoading }).then(group => group)
}

export async function kickGroupMember(groupName, { skipLoading } = {}) {
    return Requests.delete(`groups/leave/${groupName}`, { skipLoading }).then(group => group)
}

export async function getGroupMembers(groupName, { skipLoading } = {}) {
    return Requests.get(`groups/members/${groupName}`, { skipLoading }).then(group => group.data)
}

export async function getGroupCandidates(groupName, { skipLoading } = {}) {
    return Requests.get(`groups/candidates/${groupName}`, { skipLoading }).then(group => group.data)
}
