<template>
  <FormItem ref="FormItem" :schema="schema" :input="input" :id="id" :errormsg="`请选择${schema.title}`" :required="required">
    <el-radio 
      v-for="(label, idx) in schema.enum" 
      v-model="input" 
      :label="label" 
      @change="handleChange" 
      size="small" 
      :key="idx">{{label}}</el-radio>
  </FormItem>
</template>

<script>
import FormItem from './FormItem.vue'

export default {
  props: ['id', 'value', 'ui', 'schema', 'required'],
  created() {
    this.input = this.value
  },
  data() {
    return {
      input: ''
    }
  },
  components: {
    FormItem
  },
  methods: {
    handleChange(val) {
      this.$emit('onChange', val)
      this.$refs['FormItem'].handleChange(event)
    }
  }
}
</script>