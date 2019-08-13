<template>
  <div class="schema" @click.stop="chose">
    <component
      :kind="kind"
      :json.sync="_json"
      :schema="schema"
      :idSchema="idSchema"
      :required="required"
      :is="filedComponent"
    />
  </div>
</template>

<script>
import utils from '../utils'

const COMPONENT_TYPES = {
  fields: {
    array: "ArrayField",
    object: "ObjectField",
    string: "CustomField",
    integer: "CustomField",
    boolean: "CustomField"
  },
  tree: {
    array: "ArrayField",
    object: "ObjectField",
    string: "TreeField",
    integer: "TreeField",
    boolean: "TreeField"
  }
}

export default {
  props: ["kind", "schema", "json", "idSchema", "required"],
  created() {
    this.registry = utils.getDefaultRegistry()
    utils.eventbus.$on('AiVueSchema', 'HandleTreeItemChose', this.checkChose)
  },
  beforeDestroy() {
    // 每次销毁都要移除注册的事件 否则会注册一堆 混论起来
    utils.eventbus.$off('AiVueSchema', 'HandleTreeItemChose', this.checkChose)
  },
  data() {
    return {
      registry: {}
    }
  },
  computed: {
    filedComponent() {
      let _kind = this.kind == 'tree' ? 'tree' : 'fields'
      const componentName = COMPONENT_TYPES[_kind][this.schema.type]
      return this.registry[_kind][componentName]
    },
    _json: {
      get() {
        return this.json
      },
      set(nval) {
        this.$emit('update:json', nval)
      }
    }
  },
  methods: {
    checkChose(nodeid) {
      if (this.kind == 'tree') {
        if (window.schema_data_current_chosed_id + nodeid.replace('root', '') == this.idSchema.$id) {
          this.chose()
        }
      }
    },
    chose() {
      if (this.kind == 'tree') {
        utils.eventbus.$emit('AiVueSchema', 'HandleNodeChose', {
          json: this.json,
          schema: this.schema,
          idSchema: this.idSchema
        })
        window.schema_data_current_chosed_id = this.idSchema.$id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.schema {
  cursor: pointer;
  width: 100%;
  text-align: left;
}
</style>

