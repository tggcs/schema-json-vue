<template>
  <FormItem ref="FormItem" :schema="schema" :input="input" :id="id">
    <el-input-number 
      v-model="input" 
      @change="handleChange" 
      size="small" 
      label="描述文字">
    </el-input-number>
  </FormItem>
</template>

<script>
import FormItem from './FormItem.vue'

export default {
  props: ['id', 'value', 'ui', 'schema'],
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
    }
  }
}
</script>

<style>

</style>
