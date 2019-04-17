<template>
  <fieldset>
    <TitleField :title="schema.title"/>
    <DescriptionField :description="schema.description"/>
    <div v-for="(item, key, index) in properties" :key="index">
      <SchemaField 
        :schema="item" 
        :formData="(formData || {})[key]" 
        :idSchema="idSchema[key]"
        @onChange="handleChange"/>
    </div>
  </fieldset>
</template>

<script>
import TitleField from './TitleField.vue'
import SchemaField from './SchemaField.vue'
import DescriptionField from './DescriptionField.vue'

export default {
  props: ["schema", "formData", "idSchema"],
  components: {
    TitleField,
    SchemaField,
    DescriptionField
  },
  computed: {
    properties() {
      for (var key in this.schema.properties) {
        let item = this.schema.properties[key]
        if ((this.schema.required || []).indexOf(key)>-1) {
          item.required = true
        }
      }
      return this.schema.properties
    }
  },
  methods: {
    handleChange({ id, val}) {
      const key = id.$id.replace(`${this.idSchema.$id}_`, '')
      const newData = { ...this.formData, [key]: val }
      this.$emit('onChange', newData)
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  min-width: 0;
  padding: 10px;
  margin: 0 0 20px 20px;
  border-radius: 8px;
  border: 1px dashed #2196fe;
  text-align: left;
}
</style>
