import axios from 'axios'
const urlGlobal = "https://invimarefactory.desarrollodeprueba.com:6053/";

const httpClient = axios 
httpClient.interceptors.request.use(
  async config => {
    console.log('hola request interceptor');
    // console.log(config);
    
    // const sessionInfo = await Storage.get ('Session');
    // if (!config.skipLoading) document.body.classList.add('loading-indicator')

    // if (sessionInfo.token) {
    //   config.headers.Authorization = `Token token=${
    //     sessionInfo.token
    //   }`
    // }
    return config
  },
  error => Promise.reject(error),
)

httpClient.interceptors.response.use(
  response => {
    console.log('hola response interceptor');
    return response
  },
  err => {
    console.log('hola err response interceptor');
    console.log(err.response);
    
    // setTimeout(() => {
    //   document.body.classList.remove('loading-indicator')
    // }, 2000)
    // if (!err.response) {
    //   err.response = { status: 0 }
    //   return Promise.reject(err)
    // }
    // const { statusText } = err.response
    // if (statusText === 'Unauthorized' || statusText === 'Sesión invalida') {
    //   store.dispatch({ type: 'user/UNAUTH_USER' })
    // }
    // console.log(err.response);
    return Promise.reject(err)
    // return Promise.reject(err.response)
  },
)

function request(path, method, data, { _headers, skipLoading, skipToken }) {
  const headers = _headers || {}
  // if (localStorage.getItem('__auth_lupa')) headers.Authorization = `Token token=${JSON.parse(localStorage.getItem('__auth_lupa')).secret}`
  return httpClient({
    method,
    headers,
    url: `${urlGlobal}${path}`,
    baseURL: `${urlGlobal}`,
    data,
    skipLoading,
    skipToken,
  }).then(response => response).catch(err => Promise.reject(err.response))
  // }).then(response => (response.status !== 404 ? response : Promise.reject(response)))
  // }).then(response => console.log(response));
}

const Requests = {
  get(
    path,
    { headers, skipLoading, skipToken } = { headers: {}, skipLoading: false, skipToken: false },
  ) {
    return request(path, 'GET', null, { _headers: headers, skipLoading, skipToken })
  },
  post(
    path,
    data,
    { headers, skipLoading, skipToken } = { headers: {}, skipLoading: false, skipToken: false },
  ) {
    return request(path, 'POST', data, { _headers: headers, skipLoading, skipToken })
  },
  put(
    path,
    data,
    { headers, skipLoading, skipToken } = { headers: {}, skipLoading: false, skipToken: false },
  ) {
    return request(path, 'PUT', data, { _headers: headers, skipLoading, skipToken })
  },
  delete(
    path,
    { data, headers, skipLoading, skipToken } = {
      data: null,
      headers: {},
      skipLoading: false,
      skipToken: false,
    },
  ) {
    return request(path, 'DELETE', data, { _headers: headers, skipLoading, skipToken })
  },
}

export default Requests
