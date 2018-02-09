<template lang="pug">
  div.nk-text(:class='styling')
    span.nk-dropcap-3(v-if='!hideCap') {{ text[0] }}
    p {{ text }}
</template>

<script>
export default {
  name: 'b-paragraph',
  builderName: 'Paragraph',
  image: '/static/covers/hero2.png',

  props: {
    fontSize: {
      type: String,
      default: 'normal',
      editor: {
        type: 'b-enum',
        values: {
          normal: 'Normal',
          lead: 'Lead',
          small: 'Small',
          wicked: 'Wicked'
        }
      }
    },
    hideCap: {
      type: Boolean,
      default: false
    },
    italic: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Put your text here...',
      editor: {
        type: 'b-text-area'
      }
    }
  },

  computed: {
    styling () {
      return {
        [`nk-text--${this.fontSize}`]: true,
        'nk-text--italic': this.italic,
        'nk-text--bold': this.bold,
      }
    }
  }
}
</script>

<style lang="scss">
.nk-text {
  &--wicked {
    font-size: 2em
  }

  &--lead {
    font-size: 1.2em
  }

  &--small {
    font-size: 0.8em
  }

  &--italic {
    font-style: italic
  }

  &--bold {
    font-weight: bold
  }
}
</style>
