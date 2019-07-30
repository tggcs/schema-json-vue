<template>
  <el-form label-width="130px" size="small" class="vue-jsonschema">
    <MainRoot :kind="kind" :schema="schema" :json.sync="jsonschema"/>
  </el-form>
</template>

<script>
import utils from './utils'
import MainRoot from './components/index.vue'

export default {
  name: 'SchemaJsonVue',
  props: {
    kind: {
      type: String,
      default: "fields"
    },
    schema: [String, Number, Boolean, Array, Object],
    json: [String, Number, Boolean, Array, Object]
  },
  created() {
    this.initData()
    utils.eventbus.init('AiVueSchema', this)
    utils.eventbus.$on('AiVueSchema', 'HandleNodeChose', (data) => {
      this.$emit('onChose', data)
    })
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
  .el-alert--info {
    padding: 0 10px;
  }
  .el-form-item {
    position: relative;
  }
  .el-form-item__label {
    top: 50%;
    line-height: 1.5;
    transform: translateY(-50%);
    position: absolute;
  }
}
.triangle {
  display: inline-block;
  border-top: 6px solid transparent;
  border-left: 11px solid #C0C4CC;
  border-bottom: 6px solid transparent;
  transition: transform .4s ease-in-out;
}
.triangle.open {
  transform: rotate(90deg);
}
</style>
