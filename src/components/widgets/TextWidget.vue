<template>
  <FormItem ref="FormItem" :schema="schema" :input="_value" :id="id" :required="required">
    <el-input
      v-model="_value"
      @blur="handleBlur"
      size="small"
      :placeholder="`请输入${schema.title}`"
    />
  </FormItem>
</template>

<script>
import { weidget } from '../../utils/mixins.js'

export default {
  name: 'TextWidget',
  mixins: [weidget],
  methods: {
    handleBlur(event) {
      this.$refs['FormItem'].handleBlur(event)
    }
  }
}
</script>