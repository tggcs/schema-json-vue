<template>
  <fieldset>
    <div class="txt-coll" :class="{'chosed': chosed}" :style="{'padding-left': `${20*level}px`}">
      <span @click.stop="show = !show" class="triangle" :class="{'open':show}"></span>
      {{schema.title}} (Object)
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <div class="child" v-for="(item, key, index) in schema.properties" :key="index">
          <SchemaField
            kind="tree"
            :schema="item"
            :json.sync="(json || {})[key]"
            :idSchema="idSchema[key]"
            :required="schema.required && schema.required.indexOf(key)>-1"
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
  .txt-coll {
    font-size: 14px;
    color: #303133;
    line-height: 32px;
    height: 32px;
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
  .child {
    cursor: pointer;
  }
}
.txt-coll.chosed {
  background-color: rgba(33,150,243,0.1);;
  color: #2196f3;
}
</style>
