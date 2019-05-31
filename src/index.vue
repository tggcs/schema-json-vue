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
    jsonschema(nval) {
      this.$emit('onJsonChange', nval)
    }
  },
  components: {
    MainRoot
  },
  methods: {
    // handleChange(val) {
    //   this.$emit('onJsonChange', val)
    //   if (Array.isArray(val)) {
    //     this.jsonschema = JSON.parse(JSON.stringify(val) )
    //   } else {
    //     this.jsonschema = val
    //   }
    // },
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
