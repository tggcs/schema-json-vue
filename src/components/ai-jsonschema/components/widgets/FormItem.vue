<template>
  <el-form-item :label="schema.title+':'" :class="{'is-required': schema.required}">
    <el-alert :title="schema.description" v-if="schema.description" type="info" show-icon size="small" :closable="false"/>
    <slot/>
    <div class="el-form-item__error" v-show="error.show">{{error.msg}}</div>
  </el-form-item>
</template>

<script>
import utils from '../../utils'

export default {
  props: ['schema', 'input', 'id', 'errormsg'],
  created() {
    if (this.errormsg) {
      this.error.msg = this.errormsg
    }
    utils.eventbus.$on('AiVueSchema', 'HandleSchemaValidate', val => {
      this.checkError()
    })
  },
  data() {
    return {
      error: {
        show: false,
        msg: '不能为空'
      }
    }
  },
  methods: {
    handleBlur(event) {
      this.checkError()
    },
    handleChange(event) {
      this.checkError()
    },
    checkError() {
      if (!this.schema.required) {
        return
      }
      if (this.input == '' || this.input == undefined) {
        utils.errors[this.id.$id] = this.schema
        this.error.show = true
      } else {
        delete utils.errors[this.id.$id]
        this.error.show = false
      }
    }
  }
}
</script>

<style>

</style>
