<template>
  <fieldset>
    <TitleField :title="schema.title"/>
    <DescriptionField :description="schema.description"/>
    <div v-for="(item, key, index) in schema.properties" :key="index">
      <SchemaField
        :schema="item"
        :json.sync="(json || {})[key]"
        :idSchema="idSchema[key]"
        :required="schema.required && schema.required.indexOf(key)>-1"
      />
    </div>
  </fieldset>
</template>

<script>
import TitleField from './TitleField.vue'
import SchemaField from './SchemaField.vue'
import DescriptionField from './DescriptionField.vue'

export default {
  props: ["schema", "json", "idSchema"],
  components: {
    TitleField,
    SchemaField,
    DescriptionField
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
