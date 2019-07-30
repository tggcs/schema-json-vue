<template>
   <div class="collspan">
    <div class="collspan-tree">
      <jsonschema
        kind="tree"
        :schema="schema"
        :json="json"
        @onChose="handleChose"/>
    </div>
    <div class="collspan-form">
      <jsonschema
        kind="treeItem"
        ref="AiJsonSchema"
        :schema="collspanSchema"
        :json="collspanJson"
        @onJsonChange="handleChange"/>
    </div>
  </div>
</template>

<script>
import { set } from 'lodash'
import utils from './utils'
import jsonschema from './index.vue'

export default {
  name: 'SchemaJsonTreeVue',
  props: ['schema', 'json'],
  created() {
    this.initData()
  },
  watch: {
    schema() {
      this.initData()
    }
  },
  components: {
    jsonschema
  },
  data() {
    return {
      jsonResult: '',
      collspanSchema: {},
      collspanJson: {},
      collspanKeys: ['root']
    };
  },
  methods: {
    initData(cb) {
      this.$nextTick(() => {
        // 模拟第一次点击 初始数据
        utils.eventbus.$emit('AiVueSchema', 'HandleNodeChose', {
          json: this.json,
          schema: this.schema,
          idSchema: {
            $id: 'root'
          }
        })
        window.schema_data_current_chosed_id = 'root'
        cb && cb()
      })
    },
    handleChose({schema, json, idSchema}) {
      this.collspanSchema = schema
      this.collspanJson = json
      this.collspanKeys = idSchema.$id.split("_")
    },
    handleChange(val) {
      this.$emit("onJsonChange", val)

      var path = ''
      this.collspanKeys.map((key, i) => {
        if (isNaN(key)) {
          path +=  (i>0?'.':'') + key
        } else {
          path += '[' + key + ']'
        }
      })
      if (path) {
        let _json = JSON.parse(JSON.stringify(this.json))
        if (path == 'root') {
          // 只有数组 才会在root更新 所以直接赋值
          _json = val
        } else {
          set(_json, path.replace(/root\.|root/, ''), val)
        }
        this.$emit('update:json', _json)
      }
    },
    validate(cb) {
      this.initData(() => {
        this.$nextTick(() => {
          this.$refs['AiJsonSchema'].validate(valid => {
            cb(valid)
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.collspan {
  display: flex;
  &-tree {
    width: 30%;
    border-right: 1px solid #e4e7ed;
  }
  &-form {
    width: 70%;
  }
}
</style>
