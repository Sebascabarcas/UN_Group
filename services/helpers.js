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
      // case 422:
      //   Object.keys(error.data).forEach(param => {
      //     error.data[param].forEach(paramError => {
      //       switch (paramError) {
      //         case "can't be blank":
      //           return `El campo ${toEs(param)} no puede estar vacío`
      //           break
      //         case 'must exist':
      //           return `El campo ${toEs(param)} está errado`
      //           break
      //         case 'is not a number':
      //           return `El/La ${toEs(param)} debe ser un número válido`
      //           break
      //         case 'has already been taken':
      //           return `El/La ${toEs(param)} ya existe, debe ser único/a `
      //           break
      //         default:
      //           return paramError
      //           break
      //     ase 422:
      //   Object.keys(error.data).forEach(param => {
      //     error.data[param].forEach(paramError => {
      //       switch (paramError) {
      //         case "can't be blank":
      //           return `El campo ${toEs(param)} no puede estar vacío`
      //           break
      //         case 'must exist':
      //           return `El campo ${toEs(param)} está errado`
      //     ase 422:
      //   Object.keys(error.data).forEach(param => {
      //     error.data[param].forEach(paramError => {
      //       switch (paramError) {
      //         case "can't be blank":
      //           return `El campo ${toEs(param)} no puede estar vacío`
      //           break
      //         case 'must exist':
      //           return `El campo ${toEs(param)} está errado`
      //           break
      //         case 'is not a number':
      //           return `El/La ${toEs(param)} debe ser un número válido`
      //           break
      //         case 'has already been taken':
      //           return `El/La ${toEs(param)} ya existe, debe ser único/a `
      //           break
      //         default:
      //           return paramError
      //           break
      //       }
      //       message.error(errorDescription, 10)
      //     })
      //   })
      //   return 'Error'
      //   break      break
      //         case 'is not a number':
      //           return `El/La ${toEs(param)} debe ser un número válido`
      //           break
      //         case 'has already been taken':
      //           return `El/La ${toEs(param)} ya existe, debe ser único/a `
      //           break
      //         default:
      //           return paramError
      //           break
      //       }
      //       message.error(errorDescription, 10)
      //     })
      //   })
      //   return 'Error'
      //   break  }
      //       message.error(errorDescription, 10)
      //     })
      //   })
      //   return 'Error'
      //   break
      default:
        return `Error status ${error.status}`
        break
    }
  } else {
    return error
  }
  
}