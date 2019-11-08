import Requests from './Requests'
import Storage from './Storage';
import getEnvVars from '../environment';

const { apiUrl } = getEnvVars();

export async function getEvents({ skipLoading } = {}) {
    return Requests.get(`events`).then(events => events.data)
}

export async function getUserEvents({ skipLoading } = {}) {
    return Requests.get(`events`).then(events => events.data)
}

export async function getEvent(id, { skipLoading } = {}) {
    return Requests.get(`events/${id}`).then(event => event.data)
}

export async function createEvent(groupId, newEvent, { skipLoading } = {}) {
    return Requests.post(`groups/${groupId}/addEvent`, newEvent, { skipLoading}).then(new_event => new_event.data)
    
    // let {secret} = await Storage.get('Session')
    // return fetch(`${apiUrl}/UNGroup/API/groups/${groupId}/addEvent`, {
    //     method: 'POST',
    //     body: newEvent,
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //       'authorization': `Bearer ${secret}`
    //     },
    //   }).then(res => res.json());
}

export async function getEventAttendees(id, { skipLoading } = {}) {
    return Requests.get(`events/${id}/attendees`).then(eventAttendees => eventAttendees.data)
}


