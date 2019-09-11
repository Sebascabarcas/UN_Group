// import firebase from 'firebase/app'
// import { notification } from 'antd'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/storage'
import Requests from './Requests';

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

export async function createOrder (newOrder) {
  return Requests.post ('orders', newOrder).then (order => order.data);
}

export async function getOrders (
  {page_size = 10,
  index_tag = 'all',
  page = 1,
  order_tag = 'start_time',
  flag = ''}
) {
  return Requests.get (
    `orders?size_to_page=${page_size}&index_tag=${index_tag}&page=${page}&order_tag=${order_tag}&flag=${flag}`
  ).then (order => order.data);
}