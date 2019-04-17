<template>
  <div id="app">
    <readme/>
    <div class="box">
      <AiJsonSchema 
        ref="AiJsonSchema"
        :schema="schema" 
        :formData="formData" 
        @onDataChange="handleChange"/>
      <el-button type="primary" @click="getdata" size="small" class="get-data">校验表单</el-button>
      <!-- <el-button type="primary" @click="formData = {}" size="small" class="get-data">清空formData</el-button> -->
    </div>
    <div class="box">
      <p>数据结果</p>
      <pre>{{formDataTxt}}</pre>
    </div>
    <el-input type="textarea" :rows="50" placeholder="请输入Json内容" v-model="jsoninput"></el-input>
  </div>
</template>

<script>
import AiJsonSchema from './components/ai-jsonschema/index.vue'
import readme from './components/readme.vue'
import formData from './data/formData.json'

import testjson from './data/lyk/test.json'
import testjson2 from './data/lyk/test2.json'
import classdata from './data/sample/class.json'

export default {
  name: 'app',
  components: {
    AiJsonSchema,
    readme
  },
  created() {
    this.jsoninput = JSON.stringify(testjson, null ,2)
    this.formDataTxt = this.formData
  },
  data() {
    return {
      schema: {},
      formData: formData,
      jsoninput: '',
      formDataTxt: ''
    }
  },
  watch: {
    jsoninput(nval) {
      this.schema = JSON.parse(nval) 
    }
  },
  methods: {
    handleChange(val) {
      if (Array.isArray(val)) {
        this.formDataTxt = JSON.parse(JSON.stringify(val) )
      } else {
        this.formDataTxt = val
      }
    },
    getdata() {
      this.$refs['AiJsonSchema'].validate((valid) => {
        let checks = Object.keys(valid)
        if (checks.length == 0) {
          this.$message({
            message: '填写正确',
            type: 'success'
          });
        } else {
          this.$message({
            message: '有' + checks.length + '个值需要填写',
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box {
  width: 50%;
  float: left;
  padding: 10px;
  box-sizing: border-box;
}
pre {
  text-align: left;
}
.get-data {
  width: 100%;
}
</style>
