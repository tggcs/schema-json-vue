<template>
  <fieldset :class="{'noborder': !showTitle, 'intree': kind == 'treeItem'}">
    <TitleField :title="schema.title" v-if="showTitle"/>
    <DescriptionField :title="schema.description"/>
    <div v-for="(item, index) in itemlist" :key="index" class="array-item">
      <template v-if="kind == 'treeItem'">
        <div class="treeItem" @click="onChoseObject(index)">
          {{item.schema.title || '无标题'}} (Object)
        </div>
      </template>
      <template v-else>
        <!-- json 要传入引用地址，否则无法触发emit:update -->
        <SchemaField
          :kind="kind"
          :schema="item.schema"
          :json.sync="json[index]"
          :idSchema="item.idSchema"
          :required="item.required"
        />
      </template>
      <el-button
        type="text"
        icon="el-icon-delete"
        size="small"
        @click="onDelClick(index)"
        class="array-del"
      ></el-button>
    </div>
    <el-button type="primary" plain @click="onAddClick" class="array-add" icon="el-icon-plus">添加</el-button>
  </fieldset>
</template>

<script>
import utils from '../../utils'
import TitleField from './TitleField.vue'
import SchemaField from '../SchemaField.vue'
import DescriptionField from './DescriptionField.vue'

export default {
  props: ["kind", "schema", "json", "idSchema"],
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
    },
    showTitle() {
      if (this.kind == 'treeItem' && this.idSchema.$id == 'root') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    onAddClick() {
      let datainit = utils.computeDefaults(this.schema.items)
      this.json.push(datainit)
    },
    onDelClick(index) {
      this.json.splice(index, 1)
    },
    onChoseObject(index) {
      utils.eventbus.$emit('AiVueSchema', 'HandleTreeItemChose', this.idSchema.$id+'_'+index)
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  min-width: 0;
  padding: 10px 10px 20px;
  margin: 0 0 20px 20px;
  border-radius: 8px;
  border: 1px dashed #2196fe;
  text-align: left;
}

fieldset.noborder {
  border: none;
  padding-left: 0;
  padding-top: 0;
  > .array-item {
    > .treeItem {
      padding-left: 0px;
    }
  }
}

.array {
  &-add {
    width: 100%;
    background: transparent;
  }
  &-item {
    display: flex;
    .el-form-item{
      flex: auto;
    }
    fieldset {
      flex: auto;
    }
    .treeItem {
      height: 34px;
      margin-bottom: 5px;
      line-height: 34px;
      width: 100%;
      padding-left: 50px;
      font-size: 14px;
    }
    .treeItem:hover {
      background-color: #ebf6ff;
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

.intree {
  .array-add {
    width: initial;
    margin: 0 auto;
    display: block;
  }
  .array-del {
    margin-bottom: 5px;
  }
}
</style>