<template>
  <SchemaField :json="json" :schema="schema" :idSchema="idSchema"/>
</template>

<script>
import utils from '../utils'
import SchemaField from './fields/SchemaField.vue'

export default {
  props: ["schema", "json"],
  created() {
    utils.eventbus.init('AiVueSchema', this)
  },
  computed: {
    idSchema() {
      return utils.toIdSchema(this.schema)
    }
  },
  components: {
    SchemaField
  }
}
</script>
