import FormItem from '../components/widgets/FormItem.vue'

export const weidget = {
  props: ['id', 'value', 'ui', 'schema', 'required'],
  components: {
    FormItem
  },
  computed: {
    _value: {
      get () {
        return this.value 
      },
      set (nval) {
        this.$emit('update:value', nval)
      }
    }
  }
}
