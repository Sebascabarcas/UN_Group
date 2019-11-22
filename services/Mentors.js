import Requests from './Requests'

export async function getMentors(groupId, { skipLoading } = {}) {
    return Requests.get(`groups/${groupId}/mentors`, {skipLoading}).then(mentors => mentors.data)
}

export async function getMentorActivities(userId, { skipLoading } = {}) {
    return Requests.get(`users/${userId}/activities`, {skipLoading}).then(activities => activities.data)
}


// BODY { searchQuery: '' }
export async function searchActivity(searchQuery, { skipLoading } = {}) {
    return Requests.post(`search/activities`, searchQuery, {skipLoading}).then(activities => activities.data)
}

// BODY { activityName: '' }
export async function createActivity(userId, activity, { skipLoading } = {}) {
    return Requests.post(`users/${userId}`, activity, {skipLoading}).then(activity => activity.data)
}

export async function updateActivity(activityId, activity, { skipLoading } = {}) {
    return Requests.put(`activities/${activityId}`, activity, {skipLoading}).then(activity => activity.data)
}

export async function deleteActivity(activityId, { skipLoading } = {}) {
    return Requests.delete(`activities/${activityId}`, {skipLoading}).then(activity => activity.data)
}

export async function getAvailability(availabilityId, { skipLoading } = {}) {
    return Requests.get(`availabilities/${availabilityId}/`, {skipLoading}).then(availabilities => availabilities.data)
}

export async function createAvailability(activityId, availability, { skipLoading } = {}) {
    return Requests.post(`activities/${activityId}`, availability, {skipLoading}).then(availability => availability.data)
}

export async function deleteAvailability(availabilityId, availability, { skipLoading } = {}) {
    return Requests.delete(`availabilities/${availabilityId}`, availability, {skipLoading}).then(availability => availability.data)
}

export async function getActivity(activityId, { skipLoading } = {}) {
    return Requests.get(`activities/${activityId}`, {skipLoading}).then(availabilities => availabilities.data)
}

export async function updateActivityAvailability(availabilityId, availability, { skipLoading } = {}) {
    return Requests.put(`availabilities/${availabilityId}`, availability, {skipLoading}).then(availability => availability.data)
}

export async function toggleIsMentor(userId, { skipLoading } = {}) {
    return Requests.put(`users/${userId}/toggleIsMentor`, {}, {skipLoading}).then(isRolemodel => isRolemodel.data)
}

