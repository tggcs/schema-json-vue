<template>
  <el-form label-width="130px" size="small" class="ai-jsonschema">
    <MainRoot 
      :key="refresh"
      :schema="schema" 
      :formData="formDataValue"
      @onChange="handleChange"/>
  </el-form>
</template>

<script>
import MainRoot from './components/index.vue'
import utils from './utils'

export default {
  VERSION: 'v0.1.1',
  props: ["schema", "formData"],
  created() {
    this.initData()
  },
  data() {
    return {
      formDataValue: {},
      // 重新渲染组建 
      refresh: (+new Date())
    }
  },
  watch: {
    formData(nval) {
      this.initData()
      this.refresh = +new Date()
    },
    schema(nval) {
      this.initData()
    }
  },
  components: {
    MainRoot
  },
  methods: {
    handleChange(val) {
      this.$emit('onDataChange', val)
      if (Array.isArray(val)) {
        this.formDataValue = JSON.parse(JSON.stringify(val) )
      } else {
        this.formDataValue = val
      }
    },
    validate(cb) {
      utils.eventbus.$emit('AiVueSchema', 'HandleSchemaValidate', {})
      cb(utils.errors)
    },
    initData() {
      this.formDataValue = utils.getDefaultFormState(this.schema, this.formData)
      this.$emit('onDataChange', this.formDataValue)
    }
  }
};
</script>

<style lang="scss">
.ai-jsonschema {
  .el-form-item__label {
    font-size: 12px;
  }
  .el-alert--info {
    padding: 0 10px;
    .el-alert__title {
      font-size: 12px;
    }
  }
  .el-radio__label {
    font-size: 12px;
  }
}
</style>
