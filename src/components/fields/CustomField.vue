<template>
  <component
    :is="widget"
    :value.sync="_json"
    :id="idSchema"
    :schema="schema"
    :required="required"
  />
</template>

<script>
import utils from "../../utils";

export default {
  props: ["schema", "json", "idSchema", "required"],
  created() {
    this.widget = utils.getWidget(this.schema);
  },
  data() {
    return {
      widget: {}
    };
  },
  computed: {
    _json: {
      get() {
        return this.json
      },
      set(nval) {
        this.$emit('update:json', nval)
      }
    }
  }
};
</script>