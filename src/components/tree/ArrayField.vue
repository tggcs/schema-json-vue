<template>
  <fieldset>
    <div class="txt-coll" :class="{'chosed': chosed}" :style="{'padding-left': `${20*level}px`}">
      <span @click.stop="show = !show" class="triangle" :class="{'open':show}"></span>
      {{schema.title}} (Array)
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <div v-for="(item, index) in itemlist" :key="index" class="array-item">
          <!-- json 要传入引用地址，否则无法触发emit:update -->
          <SchemaField
            kind="tree"
            :schema="item.schema"
            :json.sync="json[index]"
            :idSchema="item.idSchema"
            :required="item.required"
          />
        </div>
      </div>
    </el-collapse-transition>
  </fieldset>
</template>

<script>
import utils from '../../utils'
import SchemaField from '../SchemaField.vue'

export default {
  props: ["schema", "json", "idSchema"],
  created() {
    utils.eventbus.$on('AiVueSchema', 'HandleNodeChose', (data) => {
      this.chosed = this.idSchema.$id == data.idSchema.$id
    })
  },
  components: {
    SchemaField,
  },
  data() {
    return {
      show: true,
      chosed: false
    }
  },
  computed: {
    itemlist() {
      if (Array.isArray(this.json)) {
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
      } else {
        return []
      }
    },
    level() {
      return this.idSchema.$id.split("_").length
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  min-width: 0;
  border: none;
  text-align: left;
  padding: 0;
  margin: 0;
  .child {
  }
}

.array {
  &-item {
    display: flex;
    cursor: pointer;
    .el-form-item{
      flex: auto;
    }
    fieldset {
      flex: auto;
    }
  }
}

.txt-coll {
  font-size: 14px;
  color: #303133;
  height: 32px;
  line-height: 32px;
  padding-left: 20px;
  position: relative;
  font-weight: 600;
  .triangle {
    margin-top: 5px;
  }
  .triangle:hover {
    border-left-color: #2196f3;
  }
}
.txt-coll.chosed {
  background-color: rgba(33,150,243,0.1);;
  color: #2196f3;
}
</style>