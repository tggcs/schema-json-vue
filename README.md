# vue-jsonschema

### 功能
参考 https://mozilla-services.github.io/react-jsonschema-form/

实现了一个vue的版本，当前支持简单的功能。

支持了四种输入控件：单行文本[默认]，多行文本[textarea]，单选[enum默认]，计数器[step]

支持了一种属性：必填[required]


### 调用
暂未上传到npm服务器，直接拷贝组件来调用

## API

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| schema       | schema结构       | Object         |          {}           |    —    |
| formData     | 初始数据          | Object         |         {}             |     —    |

### Events
| 参数          | 说明            | 回调参数           |
|------------- |---------------- |---------------- |
| onDataChange | change事件       | 返回当前表单填写的数据   |

### 实现
```
├─ components
|  ├─ fields    schema属性类型集合
|  ├─ widgets   插件集合
│  └─ index.vue 组件入口
├─ utils
│  ├─ common.js 公共方法
│  ├─ registry.js 插件方法
│  └─ schema.js schema方法
└─ index.vue 入口
```
