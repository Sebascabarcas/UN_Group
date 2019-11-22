import axios from 'axios'
import Storage from './Storage';
import getEnvVars from '../environment';

const httpClient = axios 
httpClient.interceptors.request.use(
  async config => {
    console.info('--------------------------');
    console.info('--------------------------');
    console.info('--------------------------');
    console.info('--------REQUEST-----------');
    console.info('-Method-');
    console.info(config.method);
    console.info('-Url-');
    console.info(config.url);
    console.info('-Headers-');
    console.info(config.headers);
    console.info('-data-');
    console.info(config.data);
    console.info('<///////REQUEST/////>');
    console.info('<////////////////////>');
    console.info('<////////////////////>');
    console.info('<////////////////////>');
    const sessionInfo = await Storage.get ('Session');
    // if (!config.skipLoading) document.body.classList.add('loading-indicator')
    if (sessionInfo) {
      config.headers.Authorization = `Bearer ${
        sessionInfo.secret
      }`
    }
    return config
  },
  error => Promise.reject(error),
)

httpClient.interceptors.response.use(
  response => {
    console.info('+++++++++++++++++++++++++')
    console.info('+++++++++++++++++++++++++')
    console.info('+++++++++++++++++++++++++')
    console.info('++++++++RESPONSE+++++++++');
    console.info('-Method-');
    console.log(response.config.method);
    console.info('-Url-');
    console.log(response.config.url);
    console.info('-Status-');
    console.log(response.status);
    console.info('-Body-');
    console.log(response.data);
    console.info('</////RESPONSE////////>');
    console.info('<////////////////////>');
    console.info('<////////////////////>');
    console.info('<////////////////////>');
    
    return response
  },
  err => {
    // console.error(err);
    console.info('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.info('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.info('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.info('xxxxxxxxxxxRESPONSExxxxxxxxxx');
    console.info('-Method-');
    console.info(err.config.method);
    console.info('-Url-');
    console.info(err.config.url);
    console.info('-Status-');
    console.info(err.response.status);
    console.info('-Body-');
    console.info(err.response.data);
    console.info('</////RESPONSE////////>');
    console.info('<////////////////////>');
    console.info('<////////////////////>');
    console.info('<////////////////////>');
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
    url: `/UNGroup/API/${path}`,
    baseURL: `https://ungroup-api.herokuapp.com`,
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
