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
    const widgetType = this.schema.widget || (this.schema.enum ? 'radio' : '') || 'text'
    this.widget = utils.getWidget(this.schema, widgetType, widgets);
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
