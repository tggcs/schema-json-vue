<template>
  <legend>{{description}}</legend>
</template>

<script>

export default {
  props: ["description"]
}
</script>

<style lang="scss" scoped>
legend {
  margin-left: 15px;
  font-size: 12px;
  margin-bottom: 5px;
}
</style>