// import { Form, Alert, Radio, Input, Switch, Button, FormItem, InputNumber } from 'element-ui'
import SchemaJsonVue from './index.vue'

const install = (Vue) => {
  // element-ui
  // Vue.use(Form)
  // Vue.use(Alert)
  // Vue.use(Radio)
  // Vue.use(Input)
  // Vue.use(Switch)
  // Vue.use(Button)
  // Vue.use(FormItem)
  // Vue.use(InputNumber)

  Vue.component(SchemaJsonVue.name, SchemaJsonVue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}