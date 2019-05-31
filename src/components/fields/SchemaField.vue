<template>
  <component
    :json.sync="_json"
    :schema="schema"
    :idSchema="idSchema"
    :required="required"
    :is="filedComponent"
  />
</template>

<script>
import utils from '../../utils'

const COMPONENT_TYPES = {
  array: "ArrayField",
  object: "ObjectField",
  string: "CustomField",
  integer: "CustomField",
  boolean: "CustomField"
}

export default {
  props: ["schema", "json", "idSchema", "required"],
  created() {
    this.registry = utils.getDefaultRegistry()
  },
  data() {
    return {
      registry: {}
    }
  },
  computed: {
    filedComponent() {
      const componentName = COMPONENT_TYPES[this.schema.type]
      return this.registry.fields[componentName]
    },
    _json: {
      get() {
        return this.json
      },
      set(nval) {
        this.$emit('update:json', nval)
      }
    }
  }
}
</script>

