<template>
  <component 
    :json="json" 
    :schema="schema" 
    :idSchema="idSchema"
    :required="required"
    :is="filedComponent" 
    @onChange="handleChange"/>
</template>

<script>
import utils from '../../utils'

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

