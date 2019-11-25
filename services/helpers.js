import {put} from 'redux-saga/effects';

export function fromJsonToFormData(obj, form, namespace, k) {
  const keys = k || Object.keys(obj)

  // Array(n).join(".").split(".");

  const fd = form || new FormData()
  let formKey

  // for(var property in obj) {
  for (let i = 0; i < keys.length; i += 1) {
    //   if(obj.hasOwnProperty(obj[keys[i]])) {
    if (namespace) {
      formKey = `${namespace}[${keys[i].match(/^[0-9]+$/) !== null ? '' : keys[i]}]`
    } else {
      formKey = keys[i]
    }
    if (obj[keys[i]] && typeof obj[keys[i]] === 'object' && (!(obj[keys[i]] instanceof File) && keys.indexOf('uri') === -1)) {
      fromJsonToFormData(obj[keys[i]], fd, formKey, Object.keys(obj[keys[i]]))
    } else {
      if (obj[keys[i]]) fd.append(formKey, obj[keys[i]])
    }
    //   }
  }

  return fd
}

export function splitAddressComponents(address) {
  let addressComponents = address.split(' ')
  return {
    typeOfRoad: addressComponents[0],
    mainRoad: addressComponents[1],
    secondaryRoad: addressComponents[3],
    roadNumber: addressComponents[5]    
  }
}

export function errorMessage(error) {
  if (error.status) {
    if (error.data.errorMsg) return error.data.errorMsg
    switch (error.status) {
      case 0:
        return 'Revise su conexión a internet'
        break
      case 500:
        return 'Error en el servidor'
        break
      case 505:
        return 'Error en el servidor, petición http no soportada'
        break
      case 507:
        return 'Error en el servidor, espacio insuficiente'
        break
      case 508:
        return 'Error en el servidor, loop detectado'
        break
      case 511:
        return 'Error en el servidor, autenticación de red requerida'
        break
      case 404:
        return 'Ruta inexistente'
        break
      case 405:
        return 'Método no soportado'
        break
      case 408:
        return 'Tiempo de espera excedido'
        break
      case 413:
        return 'Exceso de información en petición'
        break
      case 429:
        return 'Exceso de peticiones'
        break
      case 431:
        return 'Exceso de información en cabeceras de petición'
        break
      case 400:
        return 'Construcción de petición errada'
        break
      default:
        return `Error status ${error.status}`
        break
    }
  } else {
    console.log(error)
    return error
  }
  
}

export function* showErrorModal (error) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
      errorModalVisible: true,
      errorModalProps: {
        errorText: errorMessage(error) 
      }
    },
  });
}

export function* showResultModal ({resultText, resultAnimation = null}) {
  yield put ({
    type: 'modals/SET_STATE',
    payload: {
      loadingModalVisible: false,
      resultModalVisible: true,
      resultModalProps: {
        resultText,
        resultAnimation
      }
    },
  });
}