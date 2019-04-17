<template>
  <fieldset>
    <TitleField :title="schema.title"/>
    <DescriptionField :description="schema.description"/>
    <div v-for="(item, key, index) in schema.properties" :key="index">
      <SchemaField 
        :schema="item"
        :formData="(formData || {})[key]" 
        :idSchema="idSchema[key]"
        :required="schema.required && schema.required.indexOf(key)>-1"
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
