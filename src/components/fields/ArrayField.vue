<template>
  <fieldset>
    <TitleField :title="schema.title"/>
    <DescriptionField :title="schema.description"/>
    <div v-for="(item, index) in itemlist" :key="index" class="array-item">
      <!-- json 要传入引用地址，否则无法触发emit:update -->
      <SchemaField
        kind="fields"
        :schema="item.schema"
        :json.sync="json[index]"
        :idSchema="item.idSchema"
        :required="item.required"
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
import SchemaField from '../SchemaField.vue'
import DescriptionField from './DescriptionField.vue'

export default {
  props: ["schema", "json", "idSchema"],
  components: {
    TitleField,
    SchemaField,
    DescriptionField
  },
  computed: {
    itemlist() {
      return this.json.map((item, index) => {
        const itemSchema = this.schema.items
        const itemIdPrefix = this.idSchema.$id + "_" + index;
        const itemIdSchema = utils.toIdSchema(itemSchema, itemIdPrefix)
        return {
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
      this.json.push(datainit)
    },
    onDelClick(index) {
      this.json.splice(index, 1)
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