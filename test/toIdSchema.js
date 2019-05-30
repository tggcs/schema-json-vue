const schema = require('../example/data/sample/class.json')

function toIdSchema(schema, id = 'root') {
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

var res = toIdSchema(schema)
console.log(res)