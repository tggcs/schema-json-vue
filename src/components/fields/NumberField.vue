<template>
  <component 
    :is="widget" 
    :value="json" 
    :id="idSchema" 
    :schema="schema"
    @onChange="handleChange"/>
</template>

<script>
import utils from '../../utils'

export default {
  props: ["schema", "json", "idSchema"],
  created() {
    this.widget = utils.getWidget(this.schema);
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