<template lang="pug">
  div(
    ref="video"
    class="nk-page-background op-5"
    :style="`background-image: url(${placeholder});`"
  )
</template>

<script>

export default {
  name: 'video-background',
  props: ['video', 'placeholder'],

  mounted () {
  }
}
</script>

