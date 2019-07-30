import SchemaJsonVue from './index.vue'
import SchemaJsonTreeVue from './tree.vue'

const install = (Vue) => {
  Vue.component(SchemaJsonVue.name, SchemaJsonVue)
  Vue.component(SchemaJsonTreeVue.name, SchemaJsonTreeVue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}