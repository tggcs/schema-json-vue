<template>
  <component
    :is="widget"
    :value="json"
    :id="idSchema"
    :schema="schema"
    :required="required"
    @onChange="handleChange"
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
  methods: {
    handleChange(val) {
      this.$emit("onChange", val);
    }
  }
};
</script>