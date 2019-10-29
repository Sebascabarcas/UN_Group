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
    if (obj[keys[i]] && typeof obj[keys[i]] === 'object' && (!(obj[keys[i]] instanceof File) && keys.indexOf('uri') === -1)) {
      fromJsonToFormData(obj[keys[i]], fd, formKey, Object.keys(obj[keys[i]]))
    } else {
      fd.append(formKey, obj[keys[i]])
    }
    //   }
  }

  return fd
}
