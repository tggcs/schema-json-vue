<template>
  <FormItem ref="FormItem" :schema="schema" :input="_value" :id="id" :required="required">
    <el-input
      v-model="_value"
      type="textarea"
      :rows="2"
      size="small"
      @blur="handleBlur"
      :placeholder="`请输入${schema.title}`"
    />
  </FormItem>
</template>

<script>
import { weidget } from '../../utils/mixins.js'

export default {
  mixins: [weidget],
  methods: {
    handleBlur(event) {
      this.$refs['FormItem'].handleBlur(event)
    }
  }
}
</script>