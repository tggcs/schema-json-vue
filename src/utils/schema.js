import { isObject, warn } from './common'

export function toIdSchema(schema, id = 'root') {
  const idSchema = {
    $id: id
  }
  switch (schema.type) {
    case "object":
      return Object.keys(schema.properties || {}).reduce((acc, key) => {
        acc[key] = toIdSchema(schema.properties[key], id + "_" + key)
        return acc
      }, idSchema)
    case "array":
      return toIdSchema(schema.items, id)
    default:
      return idSchema
  }
}

// merge defaults data from current schema & formData
export function getDefaultFormState(schema, formData) {
  const defaults = computeDefaults(schema)
  if (!(isObject(defaults) && isObject(formData)) && !(Array.isArray(defaults) && Array.isArray(formData))) {
    warn('schema & json type is different => schema:', schema)
    Array.isArray(defaults) && (formData = [])
    isObject(defaults) && (formData = {})
  }
  switch (schema.type) {
    case "object":
      return mergeObjects(defaults, formData)
    case "array":
      return formData
  }
}

// get defaults data from current schema
export function computeDefaults(schema) {
  switch (schema.type) {
    case "object":
      return Object.keys(schema.properties || {}).reduce((acc, key) => {
        acc[key] = computeDefaults(schema.properties[key])
        return acc
      }, {})
    case "array":
      return []
    case "boolean":
      return !!schema.default
    case "integer":
      return schema.default || 0
    case "string":
      if (schema.enum && schema.enum.length && !schema.default) {
        schema.default = schema.enum[0]
      }
      return schema.default || ""
    default:
      warn('schema type error => schema:', schema)
      return schema.default || ""
  }
}

export function mergeObjects(obj1, obj2, concatArrays = false) {
  var acc = Object.assign({}, obj1)
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key]
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays)
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}