import Requests from './Requests'
import Storage from './Storage';
import getEnvVars from '../environment';

export async function getEvents({ skipLoading } = {}) {
    return Requests.get(`events`).then(events => events.data)
}

export async function getUserEvents({ skipLoading } = {}) {
    return Requests.get(`events`).then(events => events.data)
}

export async function getEvent(id, { skipLoading } = {}) {
    return Requests.get(`events/${id}`).then(event => event.data)
}

export async function getEventTasks(id, { skipLoading } = {}) {
    return Requests.get(`events/${id}/tasks`).then(tasks => tasks.data)
}

export async function completeTask(taskId, responsibleId, taskAction, { skipLoading } = {}) {
    return Requests.put(`tasks/${taskId}/responsibles/${responsibleId}`, taskAction, {skipLoading}).then(tasks => tasks.data)
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

export async function editEvent(eventId, editedEvent, { skipLoading } = {}) {
    return Requests.put(`events/${eventId}`, editedEvent, { skipLoading}).then(edited_event => edited_event.data)
}

export async function deleteEvent(eventId, { skipLoading } = {}) {
    return Requests.delete(`events/${eventId}`, { skipLoading}).then(deletedEvent => deletedEvent.data)
}

export async function createTask(eventId, newTask, { skipLoading } = {}) {
    return Requests.post(`events/${eventId}/addTask`, newTask, { skipLoading}).then(new_task => new_task.data)
    
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

export async function getEventTask(taskId, { skipLoading } = {}) {
    return Requests.get(`tasks/${taskId}`, { skipLoading}).then(new_task => new_task.data)
}

export async function editTask(taskId, editTask, { skipLoading } = {}) {
    return Requests.put(`tasks/${taskId}`, editTask, { skipLoading}).then(editTask => editTask.data)
    
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

export async function deleteTask(taskId, { skipLoading } = {}) {
    return Requests.delete(`tasks/${taskId}`, { skipLoading}).then(deletedTask => deletedTask.data)
}

export async function getEventAtendees(id, { skipLoading } = {}) {
    return Requests.get(`events/${id}/atendees`).then(eventAtendees => eventAtendees.data)
}


