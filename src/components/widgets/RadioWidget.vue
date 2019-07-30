<template>
  <FormItem
    ref="FormItem"
    :schema="schema"
    :input="_value"
    :id="id"
    :errormsg="`请选择${schema.title}`"
    :required="required"
  >
    <el-radio
      v-for="(label, idx) in schema.enum"
      v-model="_value"
      :label="label"
      @change="handleChange"
      size="small"
      :key="idx"
    >{{label}}</el-radio>
  </FormItem>
</template>

<script>
import { weidget } from '../../utils/mixins.js'

export default {
  name: 'RadioWidget',
  mixins: [weidget],
  methods: {
    handleChange(val) {
      this.$refs['FormItem'].handleChange(event)
    }
  }
}
</script>