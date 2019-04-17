<template>
  <FormItem ref="FormItem" :schema="schema" :input="input" :id="id" :required="required">
    <el-input 
      v-model="input" 
      type="textarea" 
      :rows="2" 
      size="small" 
      @change="handleChange"
      @blur="handleBlur" 
      :placeholder="`请输入${schema.title}`"/>
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
    },
    handleBlur(event) {
      this.$refs['FormItem'].handleBlur(event)
    }
  }
}
</script>

<style>

</style>
