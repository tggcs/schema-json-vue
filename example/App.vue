<template>
  <div id="app">
    <readme/>
    <div>
      <div style="margin:40px 0 10px;">
        <el-radio v-model="sampleIdx" label="classdata">data 1</el-radio>
        <el-radio v-model="sampleIdx" label="DSKDM_SCHEMA">data 2</el-radio>
        <el-radio v-model="sampleIdx" label="TEST_SCHEMA">data 3</el-radio>
        <el-radio v-model="sampleIdx" label="TTS_SCHEMA">data 4</el-radio>
      </div>
      <div class="box" style="width:70%">
        <el-tabs type="border-card" v-model="activeName">
          <el-alert v-for="(item, index) in errs" :key="index" :type="item[0]" :title="item[1]" :closable="false" :show-icon="true" class="error-tip"></el-alert>
          <el-tab-pane label="可视化" name="sample1">
            <AiJsonSchema
              v-if="activeName == 'sample1'"
              ref="AiJsonSchema"
              :schema="schema"
              :json="json"
              @onJsonChange="handleChange"
              @onJsonSchemaError="handleJsonSchemaError"/>
          </el-tab-pane>
          <el-tab-pane label="可视化-折叠" name="sample2">
            <AiJsonSchemaTree 
              v-if="activeName == 'sample2'"
              ref="AiJsonSchema"
              :schema="schema"
              :json.sync="json"
              @onJsonChange="handleChange"
              @onJsonSchemaError="handleJsonSchemaError"/>
          </el-tab-pane>
          <el-tab-pane label="JSON" name="sample3">
            <el-input v-if="activeName == 'sample3'" :class="{'errorinput': isEditIngContent}" type="textarea" :autosize="{ minRows: 12, maxRows: 30 }" placeholder="请输入Json内容" v-model="jsonResultEdit"></el-input>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" @click="checkdata" size="small" class="get-data">校验表单</el-button>
      </div>
      <div class="box" style="width:30%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据结果</span>
          </div>
          <pretty :value="jsonResult"></pretty>
        </el-card>
      </div>
      <div style="clear:both;"></div>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>JSONSCHEMA</span>
      </div>
      <el-input :class="{'errorinput': errorInput}" type="textarea" :rows="50" placeholder="请输入Json内容" v-model="schemaInput"></el-input>
    </el-card>
  </div>
</template>

<script>
import AiJsonSchema from "../src/index.vue";
import AiJsonSchemaTree from "../src/tree.vue";
import readme from "./components/readme.vue";
import pretty from "./components/pretty.vue";
import formData from "./data/formData.json";
import validator from "is-my-json-valid";

import testjson from "./data/lyk/test.json";
import testjson2 from "./data/lyk/test2.json";
import classdata from "./data/sample/class.json";
import testjsoncj from "./data/cj/test.json";
import DSKDM_SCHEMA from "./data/cj/DSKDM_SCHEMA.json";
import TEST_SCHEMA from "./data/cj/TEST_SCHEMA.json";
import TTS_SCHEMA from "./data/cj/TTS_SCHEMA.json";

export default {
  name: "app",
  components: {
    AiJsonSchema,
    AiJsonSchemaTree,
    readme,
    pretty
  },
  created() {
    this.samples = {
      testjson,
      testjson2,
      classdata,
      testjsoncj,
      DSKDM_SCHEMA,
      TEST_SCHEMA,
      TTS_SCHEMA
    };
    this.sampleIdx = "classdata"
  },
  data() {
    return {
      activeName: "sample2",
      schema: {},
      schemaInput: "",
      json: {},
      jsonResult: {},
      sampleIdx: "",
      errorInput: false,
      isEditIngContent: false,
      errs: []
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
      // this.json = [
      //   {
      //     "ageRange": "general",
      //     "display": "general",
      //     "nlgconfig": [
      //       {
      //         "key": "默认",
      //         "value": "你好"
      //       },
      //       {
      //         "key": "默认",
      //         "value": "你好"
      //       }
      //     ]
      //   },
      //   {
      //     "ageRange": "adult",
      //     "display": "screen",
      //     "nlgconfig": []
      //   },
      //   {
      //     "ageRange": "adult",
      //     "display": "screen",
      //     "nlgconfig": []
      //   }
      // ]
      this.json = {
        teacher: {
          name: '李老师1'
        },
        subject: ['数学'],
        grade: "高一121"
      };
      this.schemaInput = JSON.stringify(this.samples[this.sampleIdx], null, 2);
    }
  },
  computed: {
    jsonResultEdit: {
      get() {
        return this.isEditIngContent || JSON.stringify(this.jsonResult, null, 2)
      },
      set(nval) {
        try {
          this.json = JSON.parse(nval)
          this.isEditIngContent = false
        } catch (err) {
          this.isEditIngContent = nval
        }
      }
    }
  },
  methods: {
    handleJsonSchemaError(errs) {
      this.errs = errs
    },
    handleChange(val) {
      if (Array.isArray(val)) {
        this.jsonResult = JSON.parse(JSON.stringify(val));
      } else {
        this.jsonResult = val
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
            })
          } else {
            this.$message({
              message: "填写有误",
              type: "warning"
            })
          }
        } else {
          this.$message({
            message: "有" + checks.length + "个值需要填写",
            type: "warning"
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box {
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
.error-tip {
  margin-bottom: 2px;
  padding: 4px 16px;
}
.el-alert__title {
  font-size: 12px;
}
</style>
