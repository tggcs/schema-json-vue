<template>
  <div id="app">
    <readme/>
    <div>
      <div style="margin:40px 0 10px;">
        <el-radio v-model="sampleIdx" label="classdata">sample 1</el-radio>
        <el-radio v-model="sampleIdx" label="testjson">sample 2</el-radio>
        <el-radio v-model="sampleIdx" label="testjson2">sample 3</el-radio>
        <el-radio v-model="sampleIdx" label="testjsoncj">sample 4</el-radio>
      </div>
      <div class="box">
        <AiJsonSchema
          ref="AiJsonSchema"
          :schema="schema"
          :json="json"
          @onJsonChange="handleChange"/>
        <el-button type="primary" @click="checkdata" size="small" class="get-data">校验表单</el-button>
      </div>
      <div class="box">
        <p>数据结果</p>
        <pretty :value="jsonResult"></pretty>
      </div>
      <div style="clear:both;"></div>
    </div>
    <el-input :class="{'errorinput': errorInput}" type="textarea" :rows="50" placeholder="请输入Json内容" v-model="schemaInput"></el-input>
  </div>
</template>

<script>
import AiJsonSchema from "./components/ai-jsonschema/index.vue";
import readme from "./components/readme.vue";
import pretty from "./components/pretty.vue";
import formData from "./data/formData.json";
import validator from "is-my-json-valid";

import testjson from "./data/lyk/test.json";
import testjson2 from "./data/lyk/test2.json";
import classdata from "./data/sample/class.json";
import testjsoncj from "./data/cj/test.json";

export default {
  name: "app",
  components: {
    AiJsonSchema,
    readme,
    pretty
  },
  created() {
    this.samples = {
      testjson,
      testjson2,
      classdata,
      testjsoncj
    };
    this.sampleIdx = "classdata"
  },
  data() {
    return {
      schema: {},
      schemaInput: "",
      json: {},
      jsonResult: {},
      sampleIdx: "",
      errorInput: false
    };
  },
  watch: {
    schemaInput(nval) {
      this.errorInput = false
      try {
        this.schema = JSON.parse(nval);
      } catch (err) {
        this.errorInput = true
      }
    },
    sampleIdx(nval) {
      this.json = {};
      this.schemaInput = JSON.stringify(this.samples[this.sampleIdx], null, 2);
    }
  },
  methods: {
    handleChange(val) {
      if (Array.isArray(val)) {
        this.jsonResult = JSON.parse(JSON.stringify(val));
      } else {
        this.jsonResult = val;
      }
    },
    checkdata() {
      let jsoncheck = validator(this.schema);

      this.$refs["AiJsonSchema"].validate(valid => {
        let checks = Object.keys(valid);
        if (checks.length == 0) {
          let schemacheck = jsoncheck(this.jsonResult, {
            verbose: true
          });
          if (schemacheck) {
            this.$message({
              message: "填写正确",
              type: "success"
            });
          } else {
            this.$message({
              message: "填写有误",
              type: "success"
            });
          }
        } else {
          this.$message({
            message: "有" + checks.length + "个值需要填写",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
.errorinput .el-textarea__inner ,
.errorinput .el-textarea__inner:focus {
  border: 2px solid red;
}
</style>
