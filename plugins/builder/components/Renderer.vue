<template lang="pug">
  div.b-builder__renderer
    b-component(v-for="(component, index) in pageData" :key="index" :config='component')
</template>

<script>
export default {
  name: 'b-renderer',
  props: ['pageData']
}
</script>

