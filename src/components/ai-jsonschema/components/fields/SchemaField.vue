<template>
  <component 
    :is="filedComponent" 
    :schema="schema" 
    :formData="formData" 
    :idSchema="idSchema"
    @onChange="handleChange"/>
</template>

<script>
import utils from '../../utils'

export default {
  props: ["schema", "formData", "idSchema"],
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
      const componentName = utils.COMPONENT_TYPES[utils.getSchemaType(this.schema)]
      return this.registry.fields[componentName]
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('onChange', {
        id: this.idSchema,
        val: val
      })
    }
  }
}
</script>

