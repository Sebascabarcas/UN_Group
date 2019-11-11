// import firebase from 'firebase/app'
// import { notification } from 'antd'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/storage'
import Requests from './Requests'
import Storage from './Storage';
import getEnvVars from '../environment';

const { apiUrl } = getEnvVars();
// const firebaseConfig = {
//   apiKey: 'AIzaSyAE5G0RI2LwzwTBizhJbnRKIKbiXQIA1dY',
//   authDomain: 'cleanui-72a42.firebaseapp.com',
//   databaseURL: 'https://cleanui-72a42.firebaseio.com',
//   projectId: 'cleanui-72a42',
//   storageBucket: 'cleanui-72a42.appspot.com',
//   messagingSenderId: '583382839121',
// }

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const firebaseAuth = firebase.auth
// export default firebaseApp
// const sessionUrl = `${process.env.REACT_APP_API_URL}/sessions`
// const registerUrl = `${process.env.REACT_APP_API_URL}/users`

export async function login(auth, { skipLoading } = {}) {
  return Requests.post('users/login', auth, { skipLoading }).then(session => session.data)
}

export async function register(newUser, {skipLoading} = {}) {
  return Requests.post('users/', newUser, { skipLoading }).then(user => user.data)
}

export async function searchUsers(searchQuery, {skipLoading} = {}) {
  return Requests.post('search/users/', {searchQuery}, { skipLoading }).then(user => user.data)
}

// export async function register(newUser) {
//   return Requests.get('utils/testSQLConnection/').then(user => user.data)
// }

export async function showUser(userID, { skipLoading }) {
  return Requests.get(`users/id/${userID}`, { skipLoading }).then(user => user.data)
}

export async function updateUser(id, user, { skipLoading }) {
  // return Requests.put(`users/${id}`, user, { skipLoading }).then(user => user.data)
  console.log(user);
  let {secret} = await Storage.get('Session')
  return fetch(`${apiUrl}/UNGroup/API/users/${id}`, {
      method: 'PUT',
      body: user,
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': `Bearer ${secret}`
      },
    }).then(res => res.json());
}

export async function deleteUser(userID, { skipLoading }) {
  return Requests.delete(`users/id/${userID}`, user, { skipLoading }).then(user => user.data)
}

export async function currentAccount() {
  let session = (await Storage.get('Session'))
  if (session) return session.user
  return null 
}

export async function currentSession() {
  let session = (await Storage.get('Session'))
  if (session) return session
  return null 
}

export async function logout({ skipLoading }) {
  return Requests.delete('users/logout', { skipLoading }).then(session => session.data.data)
}

export async function getUserInvitations(id, { skipLoading } = {}) {
  return Requests.get(`users/${id}/invitations`).then(eventAttendees => eventAttendees.data)
}

export async function acceptEventInvitation(id, eventId, { skipLoading } = {}) {
  return Requests.put(`users/${id}/acceptEventInvitation/${eventId}`, {}).then(eventAccepted => eventAccepted.data)
}

export async function getUserEvents(id, { skipLoading } = {}) {
  return Requests.get(`users/${id}/atendees/`, {}).then(eventAccepted => eventAccepted.data)
}