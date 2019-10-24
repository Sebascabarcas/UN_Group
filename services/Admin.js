import Requests from './Requests'

export async function makeAdmin(username, { skipLoading } = {}) {
  return Requests.post(`users/${username}/toggleAdmin`, {secret: 'BIENESTAR'}, { skipLoading }).then(newAdmin => newAdmin.data)
}

