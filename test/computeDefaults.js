const schema = require('../example/data/sample/class.json')
const formData = {
  teacher: {
    remark: '12345'
  },
  students: [{
    name: 'tg',
    sex: 'male'
  }]
}

function isObject(thing) {
  return typeof thing === "object" && thing !== null && !Array.isArray(thing)
}

function mergeObjects(obj1, obj2, concatArrays = false) {
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

// 仅获取对象属性下default
function computeDefaults(schema) {
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
      return schema.default || ""
    default:
      // error type
      return schema.default || ""
  }
}

var defaults = computeDefaults(schema)

var defaults2 = mergeObjects(defaults, formData)

console.log(defaults)