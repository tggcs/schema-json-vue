<template>
  <SchemaField 
    :json="json" 
    :schema="schema" 
    :idSchema="idSchema"
    @onChange="handleChange"/>
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
      return utils.toIdSchema(this.schema, undefined, this.json)
    }
  },
  components: {
    SchemaField
  },
  methods: {
    handleChange({ id, val}) {
      this.$emit('onChange', val)
    }
  }
};
</script>
