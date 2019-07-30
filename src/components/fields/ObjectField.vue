<template>
  <fieldset :class="{'noborder': !showTitle}">
    <TitleField :title="schema.title" v-if="showTitle"/>
    <DescriptionField :description="schema.description"/>
    <div v-for="(item, key, index) in schema.properties" :key="index">
      <SchemaField
        :kind="kind"
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
import SchemaField from '../SchemaField.vue'
import DescriptionField from './DescriptionField.vue'

export default {
  props: ["kind", "schema", "json", "idSchema"],
  components: {
    TitleField,
    SchemaField,
    DescriptionField
  },
  computed: {
    showTitle() {
      if (this.kind == 'treeItem' && this.idSchema.$id == 'root') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  min-width: 0;
  padding: 10px 10px 20px;
  margin: 0 0 20px 20px;
  border-radius: 8px;
  border: 1px dashed #2196fe;
  text-align: left;
}

fieldset.noborder {
  border: none;
  padding-left: 0;
  padding-top: 0;
  fieldset {
    border: none;
  }
}
</style>
