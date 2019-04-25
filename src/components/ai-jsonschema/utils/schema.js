import { isObject } from './common'

export const COMPONENT_TYPES = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  object: "ObjectField",
  string: "StringField",
  boolean: "StringField",
}

export function toIdSchema(
  schema,
  id,
  formData = {},
  idPrefix = "root"
) {
  const idSchema = {
    $id: id || idPrefix,
  }
  if ("items" in schema) {
    return toIdSchema(schema.items, id, formData, idPrefix)
  }
  if (schema.type !== "object") {
    return idSchema
  }
  for (const name in schema.properties || {}) {
    const field = schema.properties[name]
    const fieldId = idSchema.$id + "_" + name
    idSchema[name] = toIdSchema(
      field,
      fieldId,
      (formData || {})[name],
      idPrefix
    )
  }
  return idSchema
}


export function getSchemaType(schema) {
  let { type } = schema
  return type
}

export function getDefaultFormState(schema, formData) {
  const defaults = computeDefaults(schema, schema.default)
  if (isObject(formData)) {
    return mergeObjects(defaults, formData)
  }
  return formData || defaults
}

function computeDefaults(schema) {
  let defaults
  if (isObject(defaults) && isObject(schema.default)) {
    defaults = mergeObjects(defaults, schema.default)
  } else if ("default" in schema) {
    defaults = schema.default
  }
  if (typeof defaults === "undefined") {
    defaults = schema.default
  }

  switch (schema.type) {
    case "object":
      return Object.keys(schema.properties || {}).reduce((acc, key) => {
        acc[key] = computeDefaults(schema.properties[key])
        return acc
      }, {})
    case "array":
      return []
  }
  
  return defaults
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