<template lang="pug">
  div
    .nk-gap-2
    component(
      :is="componentName"
      v-bind="componentProps"
    )
    .nk-gap-2
</template>

<script>
export default {
  props: ['config'],

  computed: {
    componentName () {
      return this.config.name
    },
    componentProps () {
      return this.config.props
    }
  }
}
</script>