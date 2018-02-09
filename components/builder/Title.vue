<template lang="pug">
  div.nk-title-block(:class='colorStyle')
    h3.nk-title-back(v-if="back") {{ back }}
    h4.nk-sub-title(v-if="subtitle && icon") {{ subtitle }}
    h2.nk-title(:class='headingStyle') {{ text }}
    h4.nk-sub-title(v-if="subtitle && !icon") {{ subtitle }}
    .nk-title-sep-icon(v-if='icon')
      span.icon
        i.fa(:class='`fa-${icon}`')
</template>

<script>
export default {
  name: 'b-title',
  builderName: 'Title',
  image: '/static/covers/section2.png',

  props: {
    subtitle: {
      type: String,
      default: 'Secondary heading'
    },
    text: {
      type: String,
      default: 'Main heading'
    },
    back: {
      type: String,
      default: 'Back test'
    },
    orange: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'left',
      editor: {
        type: 'b-enum',
        values: {
          left: 'Left',
          center: 'Center',
          right: 'Right'
        }
      }
    },
    size: {
      type: String,
      default: 'h1',
      editor: {
        type: 'b-enum',
        values: {
          'display-3': 'Hugest',
          'display-4': 'Huge',
          'h1': 'H1',
          'h1': 'H1',
          'h2': 'H2',
          'h3': 'H3',
          'h3': 'H4',
        }
      }
    },
    icon: {
      type: String,
      default: ''
    }
  },

  computed: {
    headingStyle () {
      return {
        [this.size]: true
      }
    },

    colorStyle () {
      return {
        [`text-${this.position}`]: true,
        'text-main-1': this.orange
      }
    }
  }
}
</script>