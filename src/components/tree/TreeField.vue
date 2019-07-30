<template>
  <div class="txt-coll" :class="{'chosed': chosed}" :style="{'padding-left': `${20*level}px`}">
    <span class="radio"></span>
    {{schema.title}} ({{schema.type}})
  </div>
</template>

<script>
import utils from '../../utils'

export default {
  props: ["schema", "json", "idSchema", "required"],
  created() {
    utils.eventbus.$on('AiVueSchema', 'HandleNodeChose', (data) => {
      this.chosed = this.idSchema.$id == data.idSchema.$id
    })
  },
  data() {
    return {
      chosed: false
    }
  },
  computed: {
    level() {
      return this.idSchema.$id.split("_").length - 1
    }
  }
};
</script>

<style lang="scss" scoped>
.txt-coll {
  font-size: 14px;
  color: #606266;
  line-height: 32px;
  height: 32px;
  padding-left: 15px;
  position: relative;
  .radio {
    width: 6px;
    height: 6px;
    background-color: #C0C4CC;
    border-radius: 100%;
    display: inline-block;
    top: -2px;
    position: relative;
  }
}
.txt-coll.chosed {
  background-color: rgba(33,150,243,0.1);
  color: #2196f3;
}
</style>
