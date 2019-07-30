import { isObject, isDef, warn } from './common'
import { isBoolean } from 'util';

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
    default:
      return formData
  }
}

export function checkJsonSchema(schema, formData, errors, key) {
  switch (schema.type) {
    case "object":
      Object.keys(formData).map(key => {
        if (!schema.properties[key]) {
          errors.push(['warning', `多余字段：${key}`])
        }
      })
      Object.keys(schema.properties).map(key => {
        if (isDef(formData[key])) {
          checkJsonSchema(schema.properties[key], formData[key], errors, key)
        }
      })
      break
    case "array":
      formData.map(item => {
        checkJsonSchema(schema.items, item, errors, key)
      })
      break
    case "boolean":
      if (!(typeof formData == "boolean")) {
        errors.push(['error', `值类型错误[boolean]：${key}`])
      }
      break
    case "integer":
      if (!(typeof formData == "number")) {
        errors.push(['error', `值类型错误[integer]：${key}`])
      }
      break
    case "string":
      if (!(typeof formData == "string")) {
        errors.push(['error', `值类型错误[string]：${key}`])
      } else if (schema.enum) {
        schema.enum.indexOf(formData) == -1 && errors.push(['error', `枚举值错误[enum]：${key}`])
      }
      break
    default:
      errors.push(['error', `值类型错误[未知类型]：${schema.type} ${key}`])
      break
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