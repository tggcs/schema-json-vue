<template>
  <FormItem ref="FormItem" :schema="schema" :input="input" :id="id" :required="true">
    <el-switch
      v-model="input" 
      @change="handleChange" 
      size="small">
    </el-switch>
  </FormItem>
</template>

<script>
import FormItem from './FormItem.vue'

export default {
  props: ['id', 'value', 'ui', 'schema'],
  created() {
    // 可能应该放在数据初始化的地方来做默认值
    if (typeof this.value == 'undefined') {
      this.$emit('onChange', false)
    }
    this.input = this.value || false
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