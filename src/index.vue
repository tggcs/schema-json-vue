<template>
  <el-form label-width="130px" size="small" class="vue-jsonschema">
    <MainRoot 
      :key="refresh"
      :schema="schema" 
      :json="jsonValue"
      @onChange="handleChange"/>
  </el-form>
</template>

<script>
import utils from './utils'
import MainRoot from './components/index.vue'

export default {
  name: 'SchemaJsonVue',
  props: ["schema", "json"],
  created() {
    this.initData()
  },
  data() {
    return {
      jsonValue: {},
      // 重新渲染组件
      refresh: (+new Date())
    }
  },
  watch: {
    json(nval) {
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
      this.$emit('onJsonChange', val)
      if (Array.isArray(val)) {
        this.jsonValue = JSON.parse(JSON.stringify(val) )
      } else {
        this.jsonValue = val
      }
    },
    validate(cb) {
      utils.eventbus.$emit('AiVueSchema', 'HandleSchemaValidate', {})
      cb(utils.errors)
    },
    initData() {
      this.jsonValue = utils.getDefaultFormState(this.schema, this.json)
      this.$emit('onJsonChange', this.jsonValue)
    }
  }
};
</script>

<style lang="scss">
.vue-jsonschema {
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
