<template>
  <legend v-if="description">{{description}}</legend>
</template>

<script>

export default {
  props: ["description"]
}
</script>

<style lang="scss" scoped>
legend {
  margin-bottom: 16px;
  font-size: 14px;
}
</style>