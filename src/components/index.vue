<template>
  <SchemaField :kind="kind" :json.sync="_json" :schema="schema" :idSchema="idSchema"/>
</template>

<script>
import utils from '../utils'
import SchemaField from './SchemaField.vue'

export default {
  props: ["kind", "schema", "json"],
  computed: {
    idSchema() {
      return utils.toIdSchema(this.schema)
    },
    _json: {
      get() {
        return this.json
      },
      set(nval) {
        this.$emit('update:json', nval)
      }
    }
  },
  components: {
    SchemaField
  }
}
</script>
