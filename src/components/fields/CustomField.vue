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
  computed: {
    widget() {
      return utils.getWidget(this.schema);
    },
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