<template>
  <fieldset>
    <TitleField :title="schema.title"/>
    <DescriptionField :title="schema.description"/>
    <div v-for="(item, index) in itemlist" :key="index" class="array-item">
      <SchemaField
        :key="refresh"
        :schema="item.schema"
        :json="item.json"
        :idSchema="item.idSchema"
        :required="item.required"
        @onChange="handleChange"
      />
      <el-button
        type="text"
        icon="el-icon-delete"
        size="small"
        @click="onDelClick(index)"
        class="array-del"
      ></el-button>
    </div>
    <el-button type="primary" @click="onAddClick" size="small" class="array-add">添加</el-button>
  </fieldset>
</template>

<script>
import utils from '../../utils'
import TitleField from './TitleField.vue'
import SchemaField from './SchemaField.vue'
import DescriptionField from './DescriptionField.vue'

export default {
  props: ["schema", "json", "idSchema"],
  data() {
    return {
      refresh: (+new Date())
    }
  },
  components: {
    TitleField,
    SchemaField,
    DescriptionField
  },
  computed: {
    itemlist() {
      return (Array.isArray(this.json) ? this.json : []).map((item, index) => {
        const itemSchema = this.schema.items
        const itemIdPrefix = this.idSchema.$id + "_" + index;
        const itemIdSchema = utils.toIdSchema(itemSchema, itemIdPrefix)
        return {
          json: item,
          schema: itemSchema,
          idSchema: itemIdSchema,
          // string 类型array 默认必填 避免空的脏数据
          required: itemSchema.type == 'string'
        }
      })
    }
  },
  methods: {
    onAddClick() {
      let datainit = utils.computeDefaults(this.schema.items)
      let array = Array.isArray(this.json) ? this.json : []
      array.push(datainit)
      this.$emit('onChange', array)
    },
    onDelClick(index) {
      this.json.splice(index, 1)
      this.$emit('onChange', this.json)
      this.refresh = +new Date()
    },
    handleChange({ id, val}) {
      const key = id.$id.replace(`${this.idSchema.$id}_`, '')
      this.json[+key] = val
      this.$emit('onChange', this.json)
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  min-width: 0;
  padding: 10px;
  margin: 0 0 20px 20px;
  border-radius: 8px;
  border: 1px dashed #2196fe;
  text-align: left;
}

.array {
  &-add {
    width: 100%;
  }
  &-item {
    display: flex;
      .el-form-item{
        flex: auto;
      }
      fieldset {
        flex: auto;
        margin-bottom: 22px;
      }
  }
  &-del {
    margin-bottom: 22px;
    width: 40px;
  }
  &-del:hover {
    background-color: #ebf6ff;
  }
}
</style>