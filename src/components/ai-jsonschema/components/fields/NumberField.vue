<template>
  <component 
    :is="widget" 
    :id="idSchema" 
    :value="formData" 
    :schema="schema"
    @onChange="handleChange"/>
</template>

<script>
import utils from '../../utils'

export default {
  props: ["schema", "formData", "idSchema"],
  created() {
    const { widgets } = utils.getDefaultRegistry()
    this.widget = utils.getWidget(this.schema, this.schema.widget || 'text', widgets);
  },
  data() {
    return {
      widget: {}
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('onChange', val)
    }
  }
}
</script>

<style>

</style>
