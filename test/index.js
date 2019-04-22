// function isObject(thing) {
//   return typeof thing === "object" && thing !== null && !Array.isArray(thing)
// }

// function mergeObjects(obj1, obj2, concatArrays = false) {
//   debugger
//   var acc = Object.assign({}, obj1)
//   return Object.keys(obj2).reduce((acc, key) => {
//     const left = obj1 ? obj1[key] : {},
//       right = obj2[key]
//     if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
//       acc[key] = mergeObjects(left, right, concatArrays)
//     } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
//       acc[key] = left.concat(right)
//     } else {
//       acc[key] = right
//     }
//     return acc
//   }, acc)
// }


// let obj1 = {
//   name: 'tg',
//   age: 21,
//   skills: {
//     tech: 'skill',
//     cook: 'fish',
//     sports: {
//       outdoor: ['run', 'fly']
//     }
//   }
// }

// let obj2 = {
//   name: 'lyt',
//   age: 19,
//   skills: {
//     tech: 'bank',
//     cook: 'meat',
//     play: 'tv'
//   }
// }

// var s = mergeObjects(obj1, obj2)
// console.log(s)

// var s2 = {...obj1, ...obj2}
// console.log(s2)

var objtest = {
  "type": "object",
  "properties": {
    "grade": {
      "type": "string",
      "title": "年级",
      "default": "高一"
    }
  }
}

 
function computeDefaults(schema) {
  debugger
  let defaults
  if ("default" in schema) {
    defaults = schema.default
  }

  switch (schema.type) {
    case 'object':
      return Object.keys(schema.properties).reduce((acc, key) => {
        acc[key] = computeDefaults(
          schema.properties[key],
          (defaults || {})[key]
        )
        return acc
      }, {})
  }
  return defaults
}

var res = computeDefaults(objtest)
console.log(res)