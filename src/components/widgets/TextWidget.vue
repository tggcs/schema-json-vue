<template>
  <FormItem ref="FormItem" :schema="schema" :input="input" :id="id" :required="required">
    <el-input 
      v-model="input" 
      @change="handleChange" 
      @blur="handleBlur" 
      size="small" 
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