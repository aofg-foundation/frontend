<template lang="pug">
  vue-markdown.nk-markdown(:source='source')
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'b-markdown',
  builderName: 'Markdown',
  image: '/static/covers/hero2.png',

  components: {
    VueMarkdown
  },

  props: {
    source: {
      type: String,
      default: 'Put your text here...',
      editor: {
        type: 'b-text-area'
      }
    }
  }
}
</script>
