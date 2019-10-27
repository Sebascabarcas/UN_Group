export default function fromJsonToFormData(obj, form, namespace, k) {
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
    if (typeof obj[keys[i]] === 'object' && (!(obj[keys[i]] instanceof File) && !obj[keys[i]].uri)) {
      fromJsonToFormData(obj[keys[i]], fd, formKey, Object.keys(obj[keys[i]]))
    } else if (obj[keys[i]].uri) {
      // if it's a string or a File object
      fd.append(formKey, obj[keys[i]])
    } else {
      fd.append(formKey, obj[keys[i]])
    }
    //   }
  }

  return fd
}
