<template lang="pug">
  div.media-browser-wrapper
    media-browser
</template>

<script>
const MediaBrowser = () => import('./MediaBrowser')

export default {
  components: {
    MediaBrowser
  }
}
</script>

