<template>
  <legend>{{title}}</legend>
</template>

<script>
export default {
  props: ["title"]
}
</script>

<style lang="scss" scoped>
legend {
  margin-left: 15px;
  font-size: 14px;
}
</style>