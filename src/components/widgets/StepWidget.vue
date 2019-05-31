<template>
  <FormItem ref="FormItem" :schema="schema" :input="_value" :id="id" :required="required">
    <el-input-number v-model="_value" size="small" label="描述文字"></el-input-number>
  </FormItem>
</template>

<script>
import { weidget } from '../../utils/mixins.js'

export default {
  mixins: [weidget]
}
</script>