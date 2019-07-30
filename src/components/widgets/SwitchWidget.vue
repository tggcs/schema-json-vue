<template>
  <FormItem ref="FormItem" :schema="schema" :input="_value" :id="id" :required="true">
    <el-switch v-model="_value" @change="handleChange" size="small"></el-switch>
  </FormItem>
</template>

<script>
import { weidget } from '../../utils/mixins.js'

export default {
  name: 'SwitchWidget',
  mixins: [weidget],
  methods: {
    handleChange(val) {
      this.$refs['FormItem'].handleChange(event)
    }
  }
}
</script>