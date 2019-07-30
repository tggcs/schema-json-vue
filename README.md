# schema-json-vue

## 功能
演示 https://tggcs.github.io/projects/schema-json-vue/index.html

参考 https://mozilla-services.github.io/react-jsonschema-form/

实现了一个vue2的版本，当前支持简单的功能。

支持了五种输入控件：单行文本[默认]，多行文本[textarea]，单选[enum默认]，计数器[step]，开关[switch]

支持了一种属性：必填[required]

支持了树菜单的形式


## 调用
```shell
npm install schema-json-vue -S
```
因为使用了ElementUI组件，还需要安装下ElementUI

main.js
``` javascript
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import 'schema-json-vue/lib/schema-json-vue.css';
import SchemaJsonVue from 'schema-json-vue'

Vue.use(ElementUI)
Vue.use(SchemaJsonVue)
```
***.vue
``` javascript
...
<schema-json-vue :schema="schema" :json="json" @onJsonChange="handleChange"/>
...
data() {
  return {
    json: {},
    schema: {
      title: "完整样例-班级",
      description: "完整样例-班级-描述",
      type: "object",
      required: ["grade", "classinfo"],
      properties: {
        teacher: {
          title: "班主任",
          description: "嵌套Object 班主任 描述",
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              title: "姓名",
              description: "班主任老师名称",
              default: "李老师"
            },
            remark: {
              type: "string",
              widget: "textarea",
              title: "备注"
            },
            isSpecial: {
              type: "boolean",
              widget: "switch",
              title: "特级教师"
            }
          }
        },
        subject: {
          type: "array",
          title: "课程",
          items: {
            title: "课程名称",
            type: "string",
            default: "语文"
          }
        },
        grade: {
          type: "string",
          title: "年级",
          default: "高一"
        },
        classinfo: {
          type: "string",
          title: "班级信息",
          widget: "textarea",
          default: "这是高一11班"
        },
        nums: {
          type: "integer",
          title: "人数",
          widget: "step",
          default: 20
        },
        kind: {
          title: "类型",
          type: "string",
          enum: ["文科", "理科"]
        },
        students: {
          title: "学员",
          type: "array",
          items: {
            type: "object",
            required: ["name", "sex"],
            properties: {
              name: {
                title: "姓名",
                type: "string",
                default: "学生甲"
              },
              sex: {
                title: "性别",
                type: "string",
                description: "学员的性别",
                enum: ["男", "女"],
                default: "男"
              }
            }
          }
        }
      }
    }
  }
},
methods: {
  handleChange(val) {
  }
}

```

## API

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| schema       | schema结构       | Object         |          {}           |    —    |
| json     | 初始数据          | Object         |         {}             |     —    |

### Events
| 参数          | 说明            | 回调参数           |
|------------- |---------------- |---------------- |
| onJsonChange | change事件       | 返回当前表单填写的数据   |


### 资料

1.collspan

https://css-tricks.com/using-css-transitions-auto-dimensions/