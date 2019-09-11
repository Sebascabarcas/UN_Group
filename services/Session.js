// import firebase from 'firebase/app'
// import { notification } from 'antd'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/storage'
import Requests from './Requests'

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
  return Requests.post('client/login', auth, { skipLoading }).then(session => session.data)
}

export async function register(newUser) {
  return Requests.post('client/signup', newUser).then(user => user.data)
}

export async function showUser(userID) {
  return Requests.get(`client/functionaries/${userID}`).then(user => user.data)
}

export async function updateUser(user, userID) {
  return Requests.put(`client/functionaries/${userID}`, user).then(user => user.data)
}

export async function deleteUser(userID) {
  return Requests.delete(`client/functionaries/${userID}`, user).then(user => user.data)
}

export async function currentAccount() {
  return JSON.parse(localStorage.getItem('authInvima'))
}

export async function logout({ skipLoading }) {
  return Requests.delete('client/logout', { skipLoading }).then(session => session.data.data)
}
