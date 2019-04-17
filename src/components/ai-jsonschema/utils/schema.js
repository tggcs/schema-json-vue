export const COMPONENT_TYPES = {
  array: "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  object: "ObjectField",
  string: "StringField",
};

export function toIdSchema(
  schema,
  id,
  definitions,
  formData = {},
  idPrefix = "root"
) {
  const idSchema = {
    $id: id || idPrefix,
  };
  if ("$ref" in schema || "dependencies" in schema) {
    const _schema = retrieveSchema(schema, definitions, formData);
    return toIdSchema(_schema, id, definitions, formData, idPrefix);
  }
  if ("items" in schema && !schema.items.$ref) {
    return toIdSchema(schema.items, id, definitions, formData, idPrefix);
  }
  if (schema.type !== "object") {
    return idSchema;
  }
  for (const name in schema.properties || {}) {
    const field = schema.properties[name];
    const fieldId = idSchema.$id + "_" + name;
    idSchema[name] = toIdSchema(
      field,
      fieldId,
      definitions,
      // It's possible that formData is not an object -- this can happen if an
      // array item has just been added, but not populated with data yet
      (formData || {})[name],
      idPrefix
    );
  }
  return idSchema;
}


export function getSchemaType(schema) {
  let { type } = schema;

  // if (!type && schema.const) {
  //   return guessType(schema.const);
  // }

  // if (!type && schema.enum) {
  //   return "string";
  // }

  // if (type instanceof Array && type.length === 2 && type.includes("null")) {
  //   return type.find(type => type !== "null");
  // }

  return type;
}

export function isFixedItems(schema) {
  return (
    Array.isArray(schema.items) &&
    schema.items.length > 0 &&
    schema.items.every(item => isObject(item))
  );
}

export function getDefaultFormState(schema, formData, definitions = {}) {
  // if (!isObject(_schema)) {
  //   throw new Error("Invalid schema: " + _schema);
  // }
  // const schema = retrieveSchema(_schema, definitions, formData);
  
  const defaults = computeDefaults(schema, schema.default, definitions);
  if (typeof formData === "undefined") {
    // No form data? Use schema defaults.
    return defaults;
  }
  if (isObject(formData)) {
    // Override schema defaults with form data.
    return mergeObjects(defaults, formData);
  }
  return formData || defaults;
}

function computeDefaults(schema, parentDefaults, definitions = {}) {
  // Compute the defaults recursively: give highest priority to deepest nodes.
  let defaults = parentDefaults;
  if (isObject(defaults) && isObject(schema.default)) {
    // For object defaults, only override parent defaults that are defined in
    // schema.default.
    defaults = mergeObjects(defaults, schema.default);
  } else if ("default" in schema) {
    // Use schema defaults for this node.
    defaults = schema.default;
  // } else if ("$ref" in schema) {
  //   // Use referenced schema defaults for this node.
  //   const refSchema = findSchemaDefinition(schema.$ref, definitions);
  //   return computeDefaults(refSchema, defaults, definitions);
  // } else if (isFixedItems(schema)) {
  //   defaults = schema.items.map(itemSchema =>
  //     computeDefaults(itemSchema, undefined, definitions)
  //   );
  }
  // Not defaults defined for this node, fallback to generic typed ones.
  if (typeof defaults === "undefined") {
    defaults = schema.default;
  }

  switch (schema.type) {
    // We need to recur for object schema inner default values.
    case "object":
      return Object.keys(schema.properties || {}).reduce((acc, key) => {
        // Compute the defaults for this node, with the parent defaults we might
        // have from a previous run: defaults[key].
        acc[key] = computeDefaults(
          schema.properties[key],
          (defaults || {})[key],
          definitions
        );
        return acc;
      }, {});

    case "array":
      if (schema.minItems) {
        // if (!isMultiSelect(schema, definitions)) {
          const defaultsLength = defaults ? defaults.length : 0;
          if (schema.minItems > defaultsLength) {
            const defaultEntries = defaults || [];
            // populate the array with the defaults
            const fillerSchema = Array.isArray(schema.items)
              ? schema.additionalItems
              : schema.items;
            const fillerEntries = fill(
              new Array(schema.minItems - defaultsLength),
              computeDefaults(fillerSchema, fillerSchema.defaults, definitions)
            );
            // then fill up the rest with either the item default or empty, up to minItems

            return defaultEntries.concat(fillerEntries);
          }
        // } else {
        //   return [];
        // }
      }
  }
  return defaults;
}

export function isObject(thing) {
  if (thing instanceof File) {
    return false;
  }
  return typeof thing === "object" && thing !== null && !Array.isArray(thing);
}

export function mergeObjects(obj1, obj2, concatArrays = false) {
  // Recursively merge deeply nested objects.
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key];
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right);
    } else {
      acc[key] = right;
    }
    return acc;
  }, acc);
}