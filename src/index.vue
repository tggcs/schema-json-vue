<template>
  <el-form label-width="130px" size="small" class="vue-jsonschema">
    <MainRoot :schema="schema" :json="jsonschema"/>
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
      jsonschema: {}
    }
  },
  watch: {
    json(nval) {
      this.initData()
    },
    schema(nval) {
      this.initData()
    },
    jsonschema: {
      handler(nval) {
        this.$emit('onJsonChange', nval)
        let configerror = []
        utils.checkJsonSchema(this.schema, nval, configerror)
        this.$emit('onJsonSchemaError', configerror)
      },
      deep: true
    }
  },
  components: {
    MainRoot
  },
  methods: {
    validate(cb) {
      utils.eventbus.$emit('AiVueSchema', 'HandleSchemaValidate', {})
      cb(utils.errors)
    },
    initData() {
      this.jsonschema = utils.getDefaultFormState(this.schema, this.json)
      this.$emit('onJsonChange', this.jsonschema)
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
