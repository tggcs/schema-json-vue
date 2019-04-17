<template>
  <div>
    <SchemaField 
      :schema="schema" 
      :formData="formData" 
      :idSchema="idSchema"
      @onChange="handleChange"/>
  </div>
</template>

<script>
import utils from '../utils'
import SchemaField from './fields/SchemaField.vue'

export default {
  props: ["schema", "formData"],
  created() {
    utils.eventbus.init('AiVueSchema', this)
  },
  computed: {
    idSchema() {
      return utils.toIdSchema(this.schema, undefined, undefined, this.formData, undefined)
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
